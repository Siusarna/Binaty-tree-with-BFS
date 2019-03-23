'use strict';

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
})

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.count = 0;
  }
  add(data) {
    this.count++;
    const last = this.last;
    const element = { next: null, item:data };
    if (last) {
      last.next = element;
      this.last = element;
    } else {
      this.first = element;
      this.last = element;
    }
  }
  pop() {
    this.count--;
    const element = this.first;
    if (!element) return null;
    if (this.last === element) {
      this.first = null;
      this.last = null;
    } else {
      this.first = element.next;
    }
    return element.item;
  }
  top(){
    return this.first.item;
  }
  size(){
    return this.count;
  }
  isEmpty(){
    if (this.first==null&&this.last==null) return true;
    return false;
  }
  clear(){
    this.front=null;
    this.last=null;
    this.size=0;
  }
  print(){
      let element = this.first;
      let string =[];
      while(element){
        string.push(element.item);
        element = element.next;
      }
      return string;
  }
}

class Element {
  constructor(value = 0) {
  this.data = value;
  this.h = 1;
  this.left=0;
  this.right = 0;
  }
}

class Binary_Tree {
  constructor() {
    const ele = new Element();
    this.top = null;
  }
  height(el){
    return el ? el.h:0;
  }
  balance_factor(el){
    return this.height(el.right)-this.height(el.left);
  }
  calc_height(el){
    let h_left = this.height(el.left);
    let h_right = this.height(el.right);
    el.h = (h_left>h_right ? h_left:h_right)+1;
  }
  left_rotate(l){
    let r = new Element();
    r = l.right;
    l.right = r.left;
    r.left = l;
    this.calc_height(l);
    this.calc_height(r);

    return r;
  }
  right_rotate(r){
    let l = new Element();
    l = r.left;
    r.left = l.right;
    l.right = r;

    this.calc_height(l);
    this.calc_height(r);

    return l;
  }
  balancing(el){
    this.calc_height(el);
    if(this.balance_factor(el)==2){
      if (this.balance_factor(el.right)<0) el.right = this.right_rotate(el.right);
      el = this.left_rotate(el);
      return el;
    }
    else if (this.balance_factor(el)==-2) {
      if(this.balance_factor(el.left)>0) el.left = this.left_rotate(el.left);
      el=this.right_rotate(el);
      return el;
    }
    return el;
  }
  ins(el,data){
    if(!el) return new Element(data);
    if(data < el.data) el.left = this.ins(el.left,data);
    else el.right = this.ins(el.right,data);
    return this.balancing(el);
  }
  add(data){
    this.top=this.ins(this.top,data);
  }
  find_left(el){
    return el.left ? this.find_left(el.left):el;
  }
  removemin(el){
    if(el.left==0) return el.right;
    el.left = this.removemin(el.left);
    return this.balancing(el);
  }
  remove(el,data){
    if(!el) return 0;
    if(data<el.data) el.left = this.remove(el.left,data);
    else if(data>el.data) el.right=this.remove(el.right,data);
    else{
      let q = new Element();
      q = el.left;
      //console.log("q");
      //this.postfix(q);
      let r = new Element();
      r = el.right;
      el = null;
      if(!r) return q;
      let min = new Element();
      min = this.find_left(r);
      min.right = this.removemin(r);
      min.left = q;
      return this.balancing(min);
    }
    return this.balancing(el);
  }
  del(data){
    this.top=this.remove(this.top,data);
  }
  find(data){
    let p = new Element();
    p = this.top;
    while(p){
      if(data<p.data) p =p.left;
      else if(data>p.data) p = p.right;
      else if(p.data == data) return data;
    }
    const str = "I cant find this value"; //a
    return str;
  }
  postfix(top){
    if(top==0) return;
    this.postfix(top.left);
    this.postfix(top.right);
    console.log(top.data);
  }
  prefix(top){
    if(top==0) return;
    console.log(top.data);
    this.prefix(top.left);
    this.prefix(top.right);
  }
  infix(top){
    if(!top) return;
    this.infix(top.left);
    console.log(top.data);
    this.infix(top.right);
  }
}

function BFS(bin_tr,b){
  const que = new Queue();
  if (!bin_tr.top) return;
  que.add(bin_tr.top);
  let n;
  let count = 0;
  while(!que.isEmpty()){
    n = que.pop();
    if(count==b) return n;
    count++;
    if(n.left!=0) que.add(n.left);
    if(n.right!=0) que.add(n.right);
  }
}

function task(bin_tr,b){
  const  top = BFS(bin_tr,b);
  const que = new Queue();
  if (!top) return;
  que.add(top);
  let n;
  let count = 0;
  while(!que.isEmpty()){
    n = que.pop();
    console.log(n.data);
    count++;
    if(n.left!=0) que.add(n.left);
    if(n.right!=0) que.add(n.right);
  }
  return count;
}

function exit () {
  rl.close();
}

const arr = [];
let b;
console.log("Enter your elements(first element is b)(if you want random input, write'random b') ");
rl.prompt();
rl.on('line', line => {
  if (line=='stop')  exit()
  else if (line[0]=='r') {
    const str = line.split(" ");
    b = str[1];
    const size = Math.floor(Math.random() * 25);
    let n;
    for(let i =0;i<+size;i++){
      n = Math.floor(Math.random() * 100);
      arr.push(n)
    }
    exit();
  }
  else {
    b = arr[0];
    arr.push(+line);
    rl.prompt();
  }
}).on('close',()=>{
  const bin_tr = new Binary_Tree();
  arr.forEach(item=>{
    bin_tr.add(item);
  })
  console.log("prefix");
  bin_tr.prefix(bin_tr.top);
  console.log("postfix");
  bin_tr.postfix(bin_tr.top);
  console.log("infix");
  bin_tr.infix(bin_tr.top);
  const random_del = Math.floor(Math.random() * arr.length);
  console.log('Find '+arr[random_del]+" = "+bin_tr.find(arr[random_del]));
  console.log('Delet '+arr[random_del]);
  bin_tr.del(arr[random_del]);
  console.log('Find '+arr[random_del]+" = "+bin_tr.find(arr[random_del]));
  console.log("");
  console.log("YOUR SUBTREE");
  console.log("count= "+task(bin_tr,b));
  process.exit(1);
});
