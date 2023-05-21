const calcMid = (start, end) => {
    mid = start + parseInt((end - start) / 2)
    return mid;
}

const binarySearch = (sortedArraySection, start, end, key) => {

    //condition to prevent errors
    if (start >= end) {
        console.log('combaring to single element');
        sortedArraySection[start] >= key ? sortedArraySection.splice(start + 1, 0, key) : sortedArraySection.splice(start, 0, key);
        return;
    }
    //measuring the mid of the new indexes for the Array note: the Array is not sliced its the same size
    // while the indexes moves on it we change the position of the mid to match them
    let binaryMid = calcMid(start, end)
    console.log('mid from binary search', binaryMid);
    //if Array indexes points on 2 elements only which are [ ... start,end ...]
    if (end - start == 1) {
        console.log('calling the insert');
        insertionCheck(sortedArraySection, binaryMid, key)
    }
    //binary search
    else if (sortedArraySection[binaryMid] >= key) {
        console.log('searching the right half');
        binarySearch(sortedArraySection, binaryMid, end, key)
    }
    else if (sortedArraySection[binaryMid] < key) {
        console.log('searching the left half');
        binarySearch(sortedArraySection, start, binaryMid - 1, key)
    }

}

const insertionCheck = (atomicArray, mid, key) => {
    // made a function for all insertions possible 
    insertBefore = (atomicArray, mid, key) => {
        atomicArray.splice(mid, 0, key)
        console.log('condition 4 happened at index:', mid, ' and :', mid + 1, ' key will be added before both nodes ');
    }

    insertAfter = (atomicArray, mid, key) => {
        console.log('condition 2 happened at index:', mid, ' and :', mid + 1, ' key will be added after both nodes ');
        atomicArray.splice(mid + 2, 0, key)
    }

    insertBetween = (atomicArray, mid, key) => {
        atomicArray.splice(mid + 1, 0, key)
        console.log('condition 3 happened at index:', mid, ' and :', mid + 1, ' key will be added between both nodes ');
    }


    console.log('from insertion check ', mid, key);
    // if the key is smaller then the mid 
    if (atomicArray[mid] >= key) {

        //we check if its also smaller then the second element 
        if (atomicArray[mid + 1] > key) {
            //if so we push the key to the end of the Array 
            insertAfter(atomicArray, mid, key)
            return;

        }

        else {
            //if not we add the key between the start and end index using splice 
            insertBetween(atomicArray, mid, key)
            return;

        }
    }

    //if the key is bigger then the mid 
    else if (atomicArray[mid] < key) {
        // we add the key to the start  replacing the old start index and pushing it 1 index further
        insertBefore(atomicArray, mid, key)
        return;

    }
}

const insertionSort = (blockArray, start, end) => {
    for (let i = start; i < end + 1; i++) {
        //making the 2 indexes that will loop through the Array start&end
        let blockEnd = i
        let key = blockArray[i]
        binarySearch(blockArray, start, blockEnd, key)
        //removing the old key after inserting it in the correct order in the array
        blockArray.splice(blockEnd + 1, 1)
        console.log('inserted key is : ', key);
        console.log('////////////////////////////////end of iteration////////////////////////////////////');

    }

}

const mapArray = (baseArray, length, start) => {
    // creating the virtual array
    let newArray = []
    for (let i = 0; i < length; i++) {
        newArray.push(baseArray[start + i])
    }
    return newArray;
}

const merge = (atomicArray, start, mid, end) => {

    console.log('calling the merge start:', start, 'mid:', mid, 'end', end);



    if (end - start < 55) {
        // because the binaryInsertion is faster then the mergeSort untile n>55
        //so we will use insertion on the small blocks that are < 55
        insertionSort(atomicArray, start, end)
        console.log('the insertionSort output is :', atomicArray.slice(start, end + 1));
    }
    else {
        //the comparesion insertion functions 
        const firstArrayInsertion = () => {
            atomicArray[atomicArrayIndex] = firstArray[firstArrayIndex]
            firstArrayIndex++;

        }

        const secondArrayInsertion = () => {
            atomicArray[atomicArrayIndex] = secondArray[secondArrayIndex]
            secondArrayIndex++;

        }
        // declaring both virtual arrays lengths
        let firstArraylength = mid - start + 1
        let secondArraylength = end - mid

        // declaring the indexes
        let firstArrayIndex = 0;
        let secondArrayIndex = 0;
        let atomicArrayIndex = start;

        //making the virtual arrays that will be merged into one sorted array 
        let firstArray = mapArray(atomicArray, firstArraylength, start)
        let secondArray = mapArray(atomicArray, secondArraylength, mid + 1)
        console.log(firstArray);
        console.log(secondArray);

        console.log('mergin the 2 sub arrays ');
        while (firstArrayIndex < firstArraylength && secondArrayIndex < secondArraylength) {
            console.log('both buffers are not empty')
            if (firstArray[firstArrayIndex] >= secondArray[secondArrayIndex]) {
                console.log('inserting the value from first array:', firstArray[firstArrayIndex], 'into the main array at position:', atomicArrayIndex);
                //replace the atomic with the first
                firstArrayInsertion()

            }
            else {
                //replace the atomic with the second
                console.log('inserting the value from second array:', secondArray[secondArrayIndex], 'into the main array at position:', atomicArrayIndex);
                secondArrayInsertion()
            }
            atomicArrayIndex++;

        }
        //add the rest from both arrays
        while (firstArrayIndex < firstArraylength) {
            console.log('adding the rest of the first array');
            firstArrayInsertion()
            atomicArrayIndex++;
        }
        while (secondArrayIndex < secondArraylength) {
            console.log('adding the rest of the second array');
            secondArrayInsertion()
            atomicArrayIndex++;
        }

    }

}

const mergeSort = (unsortedArray, start, end) => {
    //to not go under 0
    if (start >= end) {
        return;
    }
    let mid = calcMid(start, end)
    //the recursion calls
    mergeSort(unsortedArray, start, mid)
    mergeSort(unsortedArray, mid + 1, end)
    merge(unsortedArray, start, mid, end)

}

const sort = (unsortedArray) => {
    start = 0
    end = unsortedArray.length - 1
    mergeSort(unsortedArray, start, end)
}

const isSorted = (sortedArray) => {
    //check if sortedArrayay is sorted
    let second;
    for (let first = 0; first < sortedArray.length; first++) {
        second = first + 1;
        if (sortedArray[first] - sortedArray[second] < 0) {
            return false
        };
    }
    return true;
}

//making the array
let array = Array.from({ length: 5000 }, () => Math.floor(Math.random() * 1000));
console.log(array);
console.log('is array sorted', isSorted(array))
sort(array)
console.log(array);
console.log('is array sorted', isSorted(array))

