/* XXX: partial */
import {Model} from "../../model";
import * as p from "core/properties";
import {isBoolean, isInteger} from "core/util/types";
import {all, range} from "core/util/array";
import {logger} from "core/logging"

export class Filter extends Model {
  static initClass() {
    this.prototype.type = 'Filter';

    this.define({
      filter:      [p.Array,   null ],
    });
  }

  compute_indices() {
    if ((this.filter != null ? this.filter.length : undefined) >= 0) {
      if (all(this.filter, isBoolean)) {
        return (range(0, this.filter.length).filter((i) => this.filter[i] === true));
      } else if (all(this.filter, isInteger)) {
        return this.filter;
      } else {
        logger.warn(`Filter ${this.id}: filter should either be array of only booleans or only integers, defaulting to no filtering`);
        return null;
      }
    } else {
      logger.warn(`Filter ${this.id}: filter was not set to be an array, defaulting to no filtering`);
      return null;
    }
  }
}
Filter.initClass();
