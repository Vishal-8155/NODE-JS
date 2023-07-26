const circle = (r) => "Area of Circle is " + 3.14 * r * r;

const rectangle = (w,h) => "Area of Rectangle is " + w * h;

const triangle = (b,h) => "Area of Triangle is " + b * h / 2;

const sinterest = (p,r,n) => "Simple interest is " + p * r * n / 100;

const cinterest = (p,i,n) => "Compound interest is $" + ((p*(1+i)^n) - p);

const student = {
    name: 'vishal',
    age:19,
    course:'Full Stack Web Developer'
}

const user = {
    name: 'user1',
    age:20,
    about: 'xyz'
}

const employee = {
    name: 'employee1',
    age:21,
    project: 'project1'
}

module.exports = {

    circle,rectangle,triangle,sinterest,cinterest,employee,user,student

}

