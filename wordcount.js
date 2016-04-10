function mapper(fileNameLinePairs) {
  // filenameLinePairs consists of a list of objects in the form {key: fileName, value: line}
  return fileNameLinePairs.map(function(kVPair) {
    var fileName = kVPair.key; // ignored for output from this map function
    var line = kVPair.value;
    words = line.split(" ");
    return words.map(function(word) {
        return {key: word, value: "1"}; // each word contributes 1 to the total
    });
  });
}

function flatten(itemList) {
	return itemList.reduce(function(arr, list) {
		return arr.concat(list);	
	});
}

function sort(kVPairList) {
	kVPairList.sort(function(kVPair1, kVPair2) {
		var val = 0;
		if(kVPair1.key < kVPair2.key) {
			val = -1;
		}
		else if(kVPair1.key > kVPair2.key) {
			val = 1;
		}
		
		return val;
	});
}

function plus(a, b) {
	return a + parseInt(b);
}

function reducer(sortedKeyValuePairs) {
	var i = 0;
	var keyValuesList = [];
	while(i < sortedKeyValuePairs.length) {
		var key = sortedKeyValuePairs[i].key;
		var singleKeyValuesList = {key: key, values:[]};
		while(i < sortedKeyValuePairs.length && key === sortedKeyValuePairs[i].key) {
			singleKeyValuesList.values.push(sortedKeyValuePairs[i].value);
			i++;
		}
		keyValuesList.push({key: singleKeyValuesList.key, 
		                    value: singleKeyValuesList.values.reduce(plus, 0)
		                   });
	}
	
	return keyValuesList;
/*	
	var singleKeyValuesList = {key: sortedKeyValuePairs[0].key, value:sortedKeyValuePairs[0].key};
	sortedKeyValuePairs.forEach(function(kVPair) {
		if(singleKeyValuesList.key != kVPair)
		singleKeyValuePairs.push()
	});
*/
}

/*
function mapperOutputToString(listsOfWordValuePairs) {
  return listsOfWordValuePairs.map(function(pairWordValuePairs) {
    return pairWordValuePairs.map(function(pair) {
  	  return pair.key + ": " + pair.value;
    });
  });
}
*/

var filenameLinePairs = [
	{key: "hamlet.txt", value:"to be or not to be that is the question"},
    {key: "hamlet.txt", value:"whether tis nobler in the mind to suffer"},
 	{key: "hamlet.txt", value:"the slings and arrows of outrageous fortune"},
 	{key: "hamlet.txt", value:"or to take arms against a sea of troubles"},
 	{key: "hamlet.txt", value:"and by opposing end them to die to sleep"},
 	{key: "hamlet.txt", value:"no more and by a sleep to say we end"},
 	{key: "hamlet.txt", value:"the heart-ache and the thousand natural shocks"}, 
];

//console.log(mapperOutputToString(mapper(filenameLinePairs)));
var mapperOutput = flatten(mapper(filenameLinePairs));
sort(mapperOutput);
console.log(mapperOutput);
console.log(reducer(mapperOutput));