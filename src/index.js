'use strict';

class Model {
  constructor(properties) {
    this.properties = properties;
  }

  toObject() {
    return this.properties;
  }
}


var jopet = new Model({
  name: 'jopetg a'
});

console.log(jopet.properties.name);