import AbstractSmartComponent from "./abstract-smart-component.js";

import {Transfers} from '../mocks/event.js';

// import Chart from "chart.js";
// import chartjsPluginDatalabes from "chartjs-plugin-datalabels";
// import moment from "moment";

export default class Statistics extends AbstractSmartComponent {
  getTemplate() {
    return (
      `<section class="statistics">
        <h2 class="visually-hidden">Trip statistics</h2>

        <div class="statistics__item statistics__item--money">
          <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--transport">
          <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--time-spend">
          <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
        </div>
      </section>`
    );
  }

  generateChartsData(points) {
    const timeStatictics = {};
    const transportStatistics = {};
    const moneyStatistics = {};

    points.forEach((point) => {
      if (point.type in moneyStatistics) {
        moneyStatistics[point.type] += point.price;
      } else {
        moneyStatistics[point.type] = point.price;
      }

      if (point.type in transportStatistics) {
        transportStatistics[point.type] += 1;
      } else if (Transfers.includes(point.type)) {
        transportStatistics[point.type] = 1;
      }

      if (point.type in timeStatictics) {
        timeStatictics[point.type] += point.endDate - point.startDate;
      } else {
        timeStatictics[point.type] = point.endDate - point.startDate;
      }
    });
  }

}
