function formatEntities(entities) {
  return entities.map((entity) => {
    const name = Object.keys(entity)[0];
    const totalSoldValue = Number(entity[Object.keys(entity)[0]].toFixed(2));

    return { name, totalSoldValue };
  });
}

/**
 * Takes an object in the format {entity1: A, entity2: B} where entity1 and entity2 are
 * domain entities, for example, a customer or product for which there is a total value associated
 * and returns an array in the format [{name: 'entity1', value: 'A'}, {name: 'entity2', value: 'B'}]
 * with only the 5 entities with the highest value
 * @param {*} valuesPerEntity array in the format {entity1: A, entity2: B}
 * where entity1 and entity2 are domain entities, for example, a customer or product for
 * which there is a total value associated
 */
function format(valuesPerEntity) {
  let top5 = [];

  for (const key in valuesPerEntity) {
    if (Object.prototype.hasOwnProperty.call(valuesPerEntity, key)) {
      const entity = {};
      entity[key] = valuesPerEntity[key];

      top5.push(entity);
    }
  }

  top5.sort((a, b) => {
    const aValue = a[Object.keys(a)[0]];
    const bValue = b[Object.keys(b)[0]];

    return bValue - aValue;
  });

  top5 = top5.slice(0, 5);

  return formatEntities(top5);
}

module.exports = format;
