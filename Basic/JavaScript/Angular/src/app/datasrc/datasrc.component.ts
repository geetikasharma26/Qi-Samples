import { Component } from '@angular/core';

import { SdsBoundaryType, SdsRestService, SdsStreamPropertyOverride } from '../sds.rest.service'
import { SdsType, SdsStream, SdsTypeProperty, SdsTypeCode,
  SdsStreamMode, SdsView, SdsViewProperty, SdsViewMap} from '../sds.rest.service'
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

const streamId = 'WaveDataStream';
const typeId = 'WaveDataType';
const targetTypeId = 'WaveDataTargetType';
const targetIntTypeId = 'WaveDataTargetIntType';
const autoViewId = 'WaveDataAutoView';
const manualViewId = 'WaveDataManualView';

class  WaveData {
  Order: number;
  Radians: number;
  Tau: number;
  Sin: number;
  Cos: number;
  Tan: number;
  Sinh: number;
  Cosh: number;
  Tanh: number
}

class  WaveDataTarget {
  OrderTarget: number;
  RadiansTarget: number;
  TauTarget: number;
  SinTarget: number;
  CosTarget: number;
  TanTarget: number;
  SinhTarget: number;
  CoshTarget: number;
  TanhTarget: number
}

class  WaveDataInteger {
  OrderTarget: number;
  SinInt: number;
  CosInt: number;
  TanInt: number;
}

@Component({
  selector: 'app-datasrc',
  templateUrl: './datasrc.component.html',
  styleUrls: ['./datasrc.component.css']
})
export class DatasrcComponent {
  stream: SdsStream;
  events: WaveData[];
  targetEvents: WaveDataTarget[];
  integerEvents: WaveDataInteger[];
  viewMap: SdsViewMap;
  metadataMap: Map<string, string>;
  hasEvents: boolean;
  hasView1Events: boolean;
  hasView2Events: boolean;
  hasMapProperties: boolean;
  hasMetadata: boolean;

  button1Message: string;
  button2Message: string;
  button3Message: string;
  button4Message: string;
  button5Message: string;
  button6Message: string;
  button7Message: string;
  button8Message: string;
  button9Message: string;
  button10Message: string;
  button11Message: string;
  button12Message: string;
  button13Message: string;
  button14Message: string;
  button15Message: string;
  button16Message: string;
  button17Message: string;
  button18Message: string;
  button19Message: string;

  constructor(private sdsService: SdsRestService) {
    this.hasEvents = false;
  }

  buildWaveDataType() {
    const doubleType = new SdsType();
    doubleType.Id = 'doubleType';
    doubleType.SdsTypeCode = SdsTypeCode.Double;

    const intType = new SdsType();
    intType.Id = 'intType';
    intType.SdsTypeCode = SdsTypeCode.Int32;

    const orderProperty = new SdsTypeProperty();
    orderProperty.Id = 'Order';
    orderProperty.SdsType = intType;
    orderProperty.IsKey = true;

    const radiansProperty = new SdsTypeProperty();
    radiansProperty.Id = 'Radians';
    radiansProperty.SdsType = doubleType;

    const tauProperty = new SdsTypeProperty();
    tauProperty.Id = 'Tau';
    tauProperty.SdsType = doubleType;

    const sinProperty = new SdsTypeProperty();
    sinProperty.Id = 'Sin';
    sinProperty.SdsType = doubleType;

    const cosProperty = new SdsTypeProperty();
    cosProperty.Id = 'Cos';
    cosProperty.SdsType = doubleType;

    const tanProperty = new SdsTypeProperty();
    tanProperty.Id = 'Tan';
    tanProperty.SdsType = doubleType;

    const sinhProperty = new SdsTypeProperty();
    sinhProperty.Id = 'Sinh';
    sinhProperty.SdsType = doubleType;

    const coshProperty = new SdsTypeProperty();
    coshProperty.Id = 'Cosh';
    coshProperty.SdsType = doubleType;

    const tanhProperty = new SdsTypeProperty();
    tanhProperty.Id = 'Tanh';
    tanhProperty.SdsType = doubleType;

    const waveDataType = new SdsType();
    waveDataType.Id = typeId;
    waveDataType.Name = 'WaveDataType_AngularSample';
    waveDataType.Description = 'This is a sample SdsType for storing WaveData events';
    waveDataType.Properties = [orderProperty, radiansProperty, tauProperty, sinProperty,
      cosProperty, tanProperty, sinhProperty, coshProperty, tanhProperty];
    waveDataType.SdsTypeCode = SdsTypeCode.Object;

    return waveDataType;
  }

  buildWaveDataTargetType() {
    const doubleType = new SdsType();
    doubleType.Id = 'doubleType';
    doubleType.SdsTypeCode = SdsTypeCode.Double;

    const intType = new SdsType();
    intType.Id = 'intType';
    intType.SdsTypeCode = SdsTypeCode.Int32;

    const orderTargetProperty = new SdsTypeProperty();
    orderTargetProperty.Id = 'OrderTarget';
    orderTargetProperty.SdsType = intType;
    orderTargetProperty.IsKey = true;

    const radiansTargetProperty = new SdsTypeProperty();
    radiansTargetProperty.Id = 'RadiansTarget';
    radiansTargetProperty.SdsType = doubleType;

    const tauTargetProperty = new SdsTypeProperty();
    tauTargetProperty.Id = 'TauTarget';
    tauTargetProperty.SdsType = doubleType;

    const sinTargetProperty = new SdsTypeProperty();
    sinTargetProperty.Id = 'SinTarget';
    sinTargetProperty.SdsType = doubleType;

    const cosTargetProperty = new SdsTypeProperty();
    cosTargetProperty.Id = 'CosTarget';
    cosTargetProperty.SdsType = doubleType;

    const tanTargetProperty = new SdsTypeProperty();
    tanTargetProperty.Id = 'TanTarget';
    tanTargetProperty.SdsType = doubleType;

    const sinhTargetProperty = new SdsTypeProperty();
    sinhTargetProperty.Id = 'SinhTarget';
    sinhTargetProperty.SdsType = doubleType;

    const coshTargetProperty = new SdsTypeProperty();
    coshTargetProperty.Id = 'CoshTarget';
    coshTargetProperty.SdsType = doubleType;

    const tanhTargetProperty = new SdsTypeProperty();
    tanhTargetProperty.Id = 'TanhTarget';
    tanhTargetProperty.SdsType = doubleType;

    const waveDataTargetType = new SdsType();
    waveDataTargetType.Id = targetTypeId;
    waveDataTargetType.Name = 'WaveDataTargetType_AngularSample';
    waveDataTargetType.Description = 'This is a sample SdsType for storing WaveDataTarget events';
    waveDataTargetType.Properties = [orderTargetProperty, radiansTargetProperty, tauTargetProperty, sinTargetProperty,
      cosTargetProperty, tanTargetProperty, sinhTargetProperty, coshTargetProperty, tanhTargetProperty];
    waveDataTargetType.SdsTypeCode = SdsTypeCode.Object;

    return waveDataTargetType;
  }

  buildWaveDataIntegerType() {

    const intType = new SdsType();
    intType.Id = 'intType';
    intType.SdsTypeCode = SdsTypeCode.Int32;

    const orderTargetProperty = new SdsTypeProperty();
    orderTargetProperty.Id = 'OrderTarget';
    orderTargetProperty.SdsType = intType;
    orderTargetProperty.IsKey = true;

    const sinIntProperty = new SdsTypeProperty();
    sinIntProperty.Id = 'SinhInt';
    sinIntProperty.SdsType = intType;

    const cosIntProperty = new SdsTypeProperty();
    cosIntProperty.Id = 'CoshInt';
    cosIntProperty.SdsType = intType;

    const tanIntProperty = new SdsTypeProperty();
    tanIntProperty.Id = 'TanhInt';
    tanIntProperty.SdsType = intType;


    const waveDataIntType = new SdsType();
    waveDataIntType.Id = targetIntTypeId;
    waveDataIntType.Name = 'WaveDataIntegerType_AngularSample';
    waveDataIntType.Description = 'This is a sample SdsType for storing WaveDataInteger events';
    waveDataIntType.Properties = [orderTargetProperty, sinIntProperty, cosIntProperty, tanIntProperty];
    waveDataIntType.SdsTypeCode = SdsTypeCode.Object;

    return waveDataIntType;
  }

  buildAutoView() {
        const autoView = new SdsView();
        autoView.Id = autoViewId;
        autoView.Name = 'WaveData_AutoView';
        autoView.Description = 'This view uses Sds Types of the same shape and will map automatically.';
        autoView.SourceTypeId = typeId;
        autoView.TargetTypeId = targetTypeId;
        return autoView;
      }

  buildManualView() {
        const manualView = new SdsView();
        manualView.Id = manualViewId;
        manualView.Name = 'WaveData_AutoView';
        manualView.Description = 'This view uses Sds Types of different shapes, mappings are made explicitly with SdsViewProperties.';
        manualView.SourceTypeId = typeId;
        manualView.TargetTypeId = targetIntTypeId;

        const viewProperty0 = new SdsViewProperty();
        viewProperty0.SourceId = 'Order';
        viewProperty0.TargetId = 'OrderTarget';

        const viewProperty1 = new SdsViewProperty();
        viewProperty1.SourceId = 'Sinh';
        viewProperty1.TargetId = 'SinhInt';

        const viewProperty2 = new SdsViewProperty();
        viewProperty2.SourceId = 'Cosh';
        viewProperty2.TargetId = 'CoshInt';

        const viewProperty3 = new SdsViewProperty();
        viewProperty3.SourceId = 'Tanh';
        viewProperty3.TargetId = 'TanhInt';

        manualView.Properties = [viewProperty0, viewProperty1, viewProperty2, viewProperty3];
        return manualView;
  }

  newWaveDataEvent(order: number, range: number, multiplier: number) {
    const radians = 2 * Math.PI / multiplier;

    const waveData = new WaveData();
    waveData.Order = order;
    waveData.Radians = radians;
    waveData.Tau = radians / (2 * Math.PI);
    waveData.Sin = multiplier * Math.sin(radians);
    waveData.Cos = multiplier * Math.cos(radians);
    waveData.Tan = multiplier * Math.tan(radians);
    waveData.Sinh = multiplier * Math.sinh(radians);
    waveData.Cosh = multiplier * Math.cosh(radians);
    waveData.Tanh = multiplier * Math.tanh(radians);

    return waveData;
  }

  createType() {
    const type = this.buildWaveDataType();
    this.sdsService.createType(type).subscribe(res => {
      this.button1Message = this.healthyResponseMessage(res);
    },
    err => {
      this.button1Message = this.unhealthyResponseMessage(err);
    });
  }

  createStream() {
    this.stream = new SdsStream();
    this.stream.Id = streamId;
    this.stream.TypeId = typeId;
    this.sdsService.createStream(this.stream)
    .subscribe(res => {
        this.button2Message = this.healthyResponseMessage(res);
      },
      err => {
        this.button2Message = this.unhealthyResponseMessage(err);
      });
  }

  writeSingleWaveDataEvent() {
    this.sdsService.insertValue(streamId, this.newWaveDataEvent(0, 2.5, 2)).subscribe(res => {
      this.button3Message = this.healthyResponseMessage(res);
    },
    err => {
      this.button3Message = this.unhealthyResponseMessage(err);
    });
  }

  writeWaveDataEvents() {
    const list: Array<WaveData> = [];
    for (let i = 0; i < 20; i += 2) {
      list.push(this.newWaveDataEvent(i, 12, 24));
    }

    this.sdsService.insertValues(streamId, list).subscribe(res => {
      this.button3Message = this.healthyResponseMessage(res);
    },
    err => {
      this.button3Message = this.unhealthyResponseMessage(err);
    });
  }

  retrieveWaveDataEvents() {
    this.hasEvents = false;
    this.sdsService.getRangeValues(streamId, '1', 40, SdsBoundaryType.ExactOrCalculated)
      .subscribe(res => {
        this.events = res.body as WaveData[];
        this.hasEvents = true;
        this.button4Message = `Found ${this.events.length} events`
      },
      err => {
        this.button4Message = this.unhealthyResponseMessage(err);
      });
  }

  updateWaveDataEvents() {
    const list: Array<WaveData> = [];
    for (let i = 0; i < 40; i += 2) {
      list.push(this.newWaveDataEvent(i, 2.5, 5));
    }
    this.sdsService.updateValues(streamId, list).subscribe(res => {
      this.button14Message = this.healthyResponseMessage(res);
    },
    err => {
      this.button14Message = this.unhealthyResponseMessage(err);
    });
  }

  replaceWaveDataEvents() {
    const list: Array<WaveData> = [];
    for (let i = 0; i < 40; i += 2) {
      list.push(this.newWaveDataEvent(i, 1.5, 10));
    }
    this.sdsService.replaceValues(streamId, list).subscribe(res => {
      this.button15Message = this.healthyResponseMessage(res);
    },
    err => {
      this.button15Message = this.unhealthyResponseMessage(err);
    });
  }

  createPropertyOverrideAndUpdateStream() {
    const propertyOverride = new SdsStreamPropertyOverride();
    propertyOverride.SdsTypePropertyId = "Radians";
    propertyOverride.InterpolationMode = SdsStreamMode.Discrete;
    this.stream.PropertyOverrides = [propertyOverride];
    this.sdsService.updateStream(this.stream).subscribe(res => {
      this.button5Message = this.healthyResponseMessage(res);
      },
      err => {
        this.button5Message = this.unhealthyResponseMessage(err);
      });
  }

  createAutoviewTargetType() {
    const type = this.buildWaveDataTargetType();
    this.sdsService.createType(type).subscribe(res => {
      this.button6Message = this.healthyResponseMessage(res);
    },
    err => {
      this.button6Message = this.unhealthyResponseMessage(err);
    });
  }

  createAutoview() {
    const view = this.buildAutoView();
    this.sdsService.createView(view).subscribe(res => {
      this.button7Message = this.healthyResponseMessage(res);
    },
    err => {
      this.button7Message = this.unhealthyResponseMessage(err);
    });
  }

  retrieveWaveDataEventsAutoview() {
    this.hasView1Events = false;
    this.sdsService.getRangeValues(streamId, '1', 5, SdsBoundaryType.ExactOrCalculated, autoViewId)
      .subscribe(res => {
        this.targetEvents = res.body as WaveDataTarget[];
        this.hasView1Events = true;
        this.button8Message = `Found ${this.targetEvents.length} events`
      },
      err => {
        this.button8Message = this.unhealthyResponseMessage(err);
      });
  }

  createSdsViewPropertiesAndManualType() {
    const type = this.buildWaveDataIntegerType();
    this.sdsService.createType(type).subscribe(res => {
      this.button9Message = this.healthyResponseMessage(res);
    },
    err => {
      this.button9Message = this.unhealthyResponseMessage(err);
    });
    const view = this.buildManualView();
    this.sdsService.createView(view).subscribe(res => {
      this.button9Message = this.healthyResponseMessage(res);
    },
    err => {
      this.button9Message = this.unhealthyResponseMessage(err);
    });
  }

  retrieveWaveDataEventsManualview() {
    this.hasView2Events = false;
    this.sdsService.getRangeValues(streamId, '3', 5, SdsBoundaryType.ExactOrCalculated, manualViewId)
      .subscribe(res => {
        this.integerEvents = res.body as WaveDataInteger[];
        this.hasView2Events = true;
        this.button10Message = `Found ${this.integerEvents.length} events`
      },
      err => {
        this.button10Message = this.unhealthyResponseMessage(err);
      });
  }

  getSdsViewMap() {
    this.sdsService.getViewMap(manualViewId)
      .subscribe(res => {
        this.viewMap = res.body as SdsViewMap;
        this.hasMapProperties = true;
      this.button11Message = `SdsViewMap`
    },
      err => {
        this.button11Message = this.unhealthyResponseMessage(err);
      });
  }

  createTagsAndMetadata() {
    const tags = [ 'waves', 'periodic', '2018', 'validated' ];
    const metadata = {Region: 'North America', Country: 'Canada', Province: 'Quebec'};
    this.sdsService.createTags(streamId, tags)
    .subscribe(res => {
      this.button16Message = this.healthyResponseMessage(res);
    },
    err => {
      this.button16Message = this.unhealthyResponseMessage(err);
    });
    this.sdsService.createMetadata(streamId, metadata)
    .subscribe(res => {
      this.button16Message = this.healthyResponseMessage(res);
    },
    err => {
      this.button16Message = this.unhealthyResponseMessage(err);
    });
  }

  getAndPrintTags() {
    this.sdsService.getTags(streamId)
      .subscribe(res => {
        const tags = res.body as Array<string>;
        let result = 'Tags associated with ' + streamId + ': ';
        for (let i = 0; i < tags.length; i++) {
          result += (tags[i] + ', ');
        }

        this.button17Message = result;
    },
      err => {
        this.button17Message = this.unhealthyResponseMessage(err);
      });
  }

  getAndPrintMetadata() {
    this.sdsService.getMetadata(streamId)
      .subscribe(res => {
        this.metadataMap = res.body as Map<string, string>;
        this.hasMetadata = true;
    },
      err => {
        this.button18Message = this.unhealthyResponseMessage(err);
      });
  }

  searchForSdsStream() {
    this.sdsService.getStreams('periodic')
      .subscribe(res => {
        let result = 'Streams associated with "periodic": ';
        const streams = res.body as Array<SdsStream>;
        if (streams.length > 0) {
          for (let i = 0; i < streams.length; i++) {
            result += (streams[i].Id.toString() + ' ')
          }
          this.button19Message = result;
        } else {
          this.button19Message = 'No results found, search indexing can take up to 15 seconds, please try your request again.';
        }
    },
      err => {
        this.button19Message = this.unhealthyResponseMessage(err);
      });
  }

  deleteAllValues() {
    this.sdsService.deleteWindowValues(streamId, '0', '200')
      .subscribe(res => {
        this.button13Message = this.healthyResponseMessage(res);
    },
      err => {
        this.button13Message = this.unhealthyResponseMessage(err);
      });
  }

  cleanup() {
    this.sdsService.deleteStream(streamId).subscribe(() => {
      // you can't delete a type if there are existing streams or views
      // that depend on it, so we must make sure the stream is deleted first.
      this.sdsService.deleteView(autoViewId).subscribe();
      this.sdsService.deleteView(manualViewId).subscribe();
      this.sdsService.deleteType(typeId).subscribe();
      this.sdsService.deleteType(targetTypeId).subscribe();
      this.sdsService.deleteType(targetIntTypeId).subscribe();
    });
    this.hasEvents = false;
    this.button12Message = 'All Objects Deleted'
  }

  healthyResponseMessage(res: HttpResponse<any>) {
    return `${res.status} (${res.statusText})`;
  }

  unhealthyResponseMessage(err: HttpErrorResponse) {
      return `${err.status} (${err.statusText}) [${err.error ? err.error.Message: 'No error message'}]`;
  }
}
