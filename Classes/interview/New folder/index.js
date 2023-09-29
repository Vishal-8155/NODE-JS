let arr = [1,2,3,4,5,6,7,8,9,10];
let arr2 =[];
let arr3 = [];

for(let i = 0; i< arr.length; i++){
    if(arr[i] % 2 == 0){

        arr2.push(arr[i]);

    }else{

        arr3.push(arr[i]);
        
    }
}

console.log(arr2);
console.log(arr3);

