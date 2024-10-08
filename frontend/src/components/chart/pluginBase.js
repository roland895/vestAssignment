export class PluginBase {
  constructor() {W
      this._chart = undefined;
      this._series = undefined;
      this._requestUpdate = undefined;
  }

  dataUpdated = undefined;

  requestUpdate() {
      if (this._requestUpdate) this._requestUpdate();
  }

  attached({ chart, series, requestUpdate }) {
      this._chart = chart;
      this._series = series;
      this._series.subscribeDataChanged(this._fireDataUpdated);
      this._requestUpdate = requestUpdate;
      this.requestUpdate();
  }

  detached() {
      this._series?.unsubscribeDataChanged(this._fireDataUpdated);
      this._chart = undefined;
      this._series = undefined;
      this._requestUpdate = undefined;
  }

  get chart() {
      return this._chart;
  }

  get series() {
      return this._series;
  }

  _fireDataUpdated = (scope) => {
      if (this.dataUpdated) {
          this.dataUpdated(scope);
      }
  }
}