const fs = require('fs');
const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const inFile = fs.createReadStream('features.csv')
const csvWriter = createCsvWriter({
  path: 'newFeature.csv',
  header: [
    {id: 'featureId', title: 'featureId'},
    {id: 'feature', title: 'feature'},
    {id: 'value', title: 'value'},
  ]
});

const csvWriterJoin = createCsvWriter({
  path: 'featureJoin.csv',
  header: [
    {id: 'productId', title: 'productId'},
    {id: 'featureId', title: 'featureId'}
  ]
});


let count = 0;
//itteate over csv
 //if name: feature && value: string


/**
 *
 * @param {array of feature objects} results
 * @param {name to search for} featureName
 * @param {value to search for} featureValue
 * @returns {found object or undefined}
 */

 const findFeatureInArray = (results, featureName, featureValue) => {
  return results.find((result)=> (result['feature'] === featureName && result['value'] === featureValue))
};

const createNewFeature = (featureName, featureValue) =>{
 count ++;
  return {
    featureId: count,
    feature: featureName,
    value: featureValue
  };
};

const createProductsFeaturesJoinRow = (productId, feature) => {

 return {
   productId: productId,
   featureId: feature,
 }
};

  let results = [];
  let joinResults = [];
  inFile
  .pipe(csv())
  .on('data', (row) => {

    const productId = row['productId'];
    const featureName = row['feature'];
    const featureValue = row['value'];

    let feature = findFeatureInArray(results, featureName, featureValue);
    if (!feature) {
      feature = createNewFeature(featureName, featureValue);
      results.push(feature);
    }

    const joinRowCreation = createProductsFeaturesJoinRow(productId, feature['featureId'])
    joinResults.push(joinRowCreation);
    if(productId < 6) {
      console.log(JSON.stringify(joinRowCreation))
    }


  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    console.log(results.length)
    csvWriter
    .writeRecords(results)
    .then(()=> console.log('The CSV file was written successfully'));
    csvWriterJoin
    .writeRecords(joinResults)
    .then()
    .catch((err) => console.log(err))
  });



