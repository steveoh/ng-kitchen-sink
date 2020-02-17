import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import Basemap from 'arcgis-js-api/Basemap';
import FeatureLayer from 'arcgis-js-api/layers/FeatureLayer';
import LOD from 'arcgis-js-api/layers/support/LOD';
import TileInfo from 'arcgis-js-api/layers/support/TileInfo';
import WebTileLayer from 'arcgis-js-api/layers/WebTileLayer';

import { setTileInfosForApplianceLayers } from './Discover';
import { createDefaultTileInfo } from './TileInfo';

const imageryAttributionJsonUrl = 'https://mapserv.utah.gov/cdn/attribution/imagery.json';

@Component({
  selector: 'agrc-layer-selector',
  templateUrl: './layer-selector.component.html',
  styleUrls: ['./layer-selector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayerSelectorComponent implements OnInit {
  @Input()
  makeExpandable: true;
  @Input()
  baseLayers = [];
  @Input()
  overlays = [];
  @Input()
  view: any;
  @Input()
  quadWord: string;
  @Input()
  top = true;
  @Input()
  right = true;
  layers = {
    baseLayers: [],
    overlays: []
  };
  linkedLayers = [];
  managedLayers = {};

  constructor(private me: ElementRef) {}

  ngOnInit() {
    this.buildLayers();
  }

  buildLayers() {
    const applianceLayerTemplates = {
      Imagery: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${this.quadWord}/tiles/utah/{level}/{col}/{row}`,
        hasAttributionData: true,
        attributionDataUrl: imageryAttributionJsonUrl
      },
      Topo: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${this.quadWord}/tiles/topo_basemap/{level}/{col}/{row}`,
        copyright: 'AGRC'
      },
      Terrain: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${this.quadWord}/tiles/terrain_basemap/{level}/{col}/{row}`,
        copyright: 'AGRC'
      },
      Lite: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${this.quadWord}/tiles/lite_basemap/{level}/{col}/{row}`,
        copyright: 'AGRC'
      },
      'Color IR': {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${this.quadWord}/tiles/naip_2011_nrg/{level}/{col}/{row}`,
        copyright: 'AGRC'
      },
      Hybrid: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${this.quadWord}/tiles/utah/{level}/{col}/{row}`,
        linked: ['Overlay'],
        copyright: 'Google, AGRC',
        hasAttributionData: true,
        attributionDataUrl: imageryAttributionJsonUrl
      },
      Overlay: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${this.quadWord}/tiles/overlay_basemap/{level}/{col}/{row}`
        // no attribution for overlay layers since it just duplicates the base map attribution
      },
      'Address Points': {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${this.quadWord}/tiles/address_points_basemap/{level}/{col}/{row}`
      }
    };

    this.view.map.basemap = new Basemap();

    const defaultTileInfo = createDefaultTileInfo(LOD);
    const applianceLayers = setTileInfosForApplianceLayers(
      applianceLayerTemplates,
      defaultTileInfo,
      TileInfo
    );

    const baseLayers =
      createLayerFactories(
        'baselayer',
        this.baseLayers,
        WebTileLayer,
        this.quadWord,
        applianceLayers
      ) || [];
    let overlays = this.overlays || [];

    let hasDefaultSelection = false;
    let defaultSelection = null;
    let hasHybrid = false;
    let linkedLayersBuilder = [];

    baseLayers.forEach(layer => {
      if (layer.selected === true) {
        hasDefaultSelection = true;
        defaultSelection = layer;
      }

      if ((layer.id || layer.token) === 'Hybrid') {
        hasHybrid = true;
      }

      if (layer.linked) {
        linkedLayersBuilder = linkedLayersBuilder.concat(layer.linked);
      }
    });
    this.linkedLayers = linkedLayersBuilder;

    // set default basemap to index 0 if not specified by the user
    if (!hasDefaultSelection && baseLayers.length > 0) {
      baseLayers[0].selected = true;
      defaultSelection = baseLayers[0];
    }

    // insert overlay to first spot because hybrid
    if (hasHybrid) {
      overlays.splice(0, 0, 'Overlay');
    }

    overlays =
      createLayerFactories(
        'overlay',
        overlays,
        WebTileLayer,
        this.quadWord,
        applianceLayers
      ) || [];

    // set visibility of linked layers to match
    if (defaultSelection.linked && defaultSelection.linked.length > 0) {
      overlays.forEach(layer => {
        if (defaultSelection.linked.includes(layer.id)) {
          layer.selected = true;
        }
      });
    }

    this.layers = {
      baseLayers,
      overlays
    };

    this.updateMap();

    const y = this.top ? 'top' : 'bottom';
    const x = this.right ? 'right' : 'left';
    this.view.ui.add(this.me.nativeElement, [y, x].join('-'));
  }

  updateMap() {
    console.log('LayerSelector:updateMap');

    const managedLayersDraft = { ...this.managedLayers };
    const layerItems = this.layers.baseLayers.concat(this.layers.overlays);

    layerItems.forEach(layerItem => {
      let layerList = null;
      switch (layerItem.layerType) {
        case 'baselayer':
          if (this.view.map.basemap && this.view.map.basemap.baseLayers) {
            layerList = this.view.map.basemap.baseLayers;
          }
          break;
        case 'overlay':
          layerList = this.view.map.layers;
          break;
        default:
          break;
      }

      if (layerItem.selected === false) {
        var managedLayer = managedLayersDraft[layerItem.id] || {};
        if (!managedLayer.layer) {
          managedLayer.layer = layerList.getItemAt(
            layerList.indexOf(layerItem.layer)
          );
        }

        if (managedLayer.layer) {
          layerList.remove(managedLayer.layer);
        }

        return;
      }

      if (Object.keys(managedLayersDraft).indexOf(layerItem.id) < 0) {
        managedLayersDraft[layerItem.id] = {
          layerType: layerItem.layerType
        };
      }

      const esriLayerModules = {
        WebTileLayer,
        FeatureLayer
      };

      if (!managedLayersDraft[layerItem.id].layer) {
        if (typeof layerItem.Factory === 'string') {
          layerItem.Factory = esriLayerModules[layerItem.Factory];
        }
        managedLayersDraft[layerItem.id].layer = new layerItem.Factory(
          layerItem
        );
      }

      if (layerItem.selected === true) {
        if (!layerList.includes(managedLayersDraft[layerItem.id].layer)) {
          layerList.add(managedLayersDraft[layerItem.id].layer);
        }
      } else {
        layerList.remove(managedLayersDraft[layerItem.id].layer);
      }

      // When you set the zoom on a map view without a cached layer, it has no effect on the scale of the map.
      // This is a hack to re-apply the zoom after adding the first cached layer.
      managedLayersDraft[layerItem.id].layer.when('loaded', () => {
        const currentScale =
          managedLayersDraft[layerItem.id].layer.tileInfo.lods[this.view.zoom]
            .scale;
        if (this.view.zoom > -1 && this.view.scale !== currentScale) {
          // eslint-disable-next-line no-self-assign
          this.view.zoom = this.view.zoom;
        }
      });

      this.managedLayers = managedLayersDraft;
    });
  }

  onItemChanged(changedItem) {
    console.log('LayerSelector.onItemChanged', changedItem);
    const overlays = this.layers.overlays;
    const baseLayers = this.layers.baseLayers;

    if (changedItem.layerType === 'baselayer') {
      baseLayers.forEach(item => {
        item.selected = item.id === changedItem.id ? true : false;
      });

      const selectedItem = baseLayers.filter(layer => layer.selected)[0];

      if (selectedItem.linked && selectedItem.linked.length > 0) {
        overlays.forEach(item => {
          if (selectedItem.linked.includes(item.id)) {
            item.selected = true;
          }

          return item;
        });
      } else {
        overlays.forEach(item => {
          if (this.linkedLayers.includes(item.id)) {
            item.selected = false;
          }
        });
      }
    } else if (changedItem.layerType === 'overlay') {
      overlays.forEach(item => {
        if (item.id === changedItem.id) {
          item.selected = !item.selected;
        }
      });
    }

    this.layers = {
      overlays,
      baseLayers
    };

    this.updateMap();
  }
}

/**
* Takes layer tokens from `applianceLayers` keys and resolves them to `layerFactory` objects with
* `esri/layer/WebTileLayer` factories.
* @private
* @param {string} layerType - the type of layer `overlay` or `baselayer`.
* @param {string[]|layerFactory[]} layerFactories - An array of layer tokens or layer factories.
* @returns {layerFactory[]} an array of resolved layer Factory objects.
*/
const createLayerFactories = (layerType, layerFactories, WebTileLayer, quadWord, applianceLayers) => {
  const resolvedInfos = [];
  layerFactories.forEach((li) => {
    if ((typeof li === 'string' || li instanceof String || li.token) ||
      (typeof li.token === 'string' || li.token instanceof String)) {

      const id = (li.token || li);

      if (!quadWord) {
        console.warn('layer-selector::You chose to use a layer token `' + id + '` without setting ' +
          'your `quadWord` from Discover. The requests for tiles will fail to ' +
          ' authenticate. Pass `quadWord` into the constructor of this widget.');

        return false;
      }

      var layer = applianceLayers[id];

      if (!layer) {
        console.warn('layer-selector::The layer token `' + id + '` was not found. Please use one of ' +
          'the supported tokens (' + Object.keys(applianceLayers).join(', ') +
          ') or pass in the information on how to create your custom layer ' +
          '(`{Factory, url, id}`).');

        return false;
      }

      const linked = [layer.linked, li.linked].reduce((acc, value, index) => {
        if (value) {
          acc = acc.concat(value);
        }

        if (index === 1 && acc.length === 0) {
          return null;
        }

        return acc;
      }, []);

      resolvedInfos.push({
        Factory: WebTileLayer,
        urlTemplate: layer.urlPattern,
        linked,
        id,
        selected: !!li.selected,
        copyright: layer.copyright,
        layerType
        // TODO: not supported in 4.x WebTileLayer copyright
        // hasAttributionData: layer.hasAttributionData,
        // attributionDataUrl: layer.attributionDataUrl
      });
    } else {
      if (!Object.prototype.hasOwnProperty.call(li, 'layerType')) {
        li.layerType = layerType;
      }

      if (!li.selected) {
        li.selected = false;
      }

      resolvedInfos.push(li);
    }
  });

  return resolvedInfos;
};
