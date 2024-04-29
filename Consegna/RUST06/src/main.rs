use std::{cell::RefCell, rc::Rc, fmt::Display};
#[derive(Default)]
struct Node<T:Copy> {
	item: T,
	next: Pointer<T>,
	prev: Pointer<T>,
}

#[derive(Clone,Copy,Debug,PartialEq)]
struct Point{
    a : i32,
    b : i32
}

impl<T:Copy> Node<T> {
	fn new(item: T) -> Self {
        Node {
            item : item,
            next : None,
            prev : None
        }
    }
}

type Pointer<T> = Option<Rc<RefCell<Node<T>>>>;


#[derive(Default)]
pub struct DoublyPointedList<T:Copy> {
	head: Pointer<T>,
	tail: Pointer<T>,
	size: usize,
}

impl<T:Copy> DoublyPointedList<T> {
	pub fn new() -> Self {
        DoublyPointedList { 
            head: None, 
            tail: None, 
            size: 0 
        }
    }
    pub fn is_empty(&self) -> bool {
        if self.size == 0 {
            true
        }else {
            false
        }
    }

    pub fn len(&self) -> usize{
        self.size
    }

    pub fn push_back(&mut self, item: T) {
        let node = Rc::new(RefCell::new(Node::new(item)));
        if let Some(prev_tail) = self.tail.take() {
            prev_tail.borrow_mut().next = Some(Rc::clone(&node));
            node.borrow_mut().prev = Some(prev_tail);
            self.tail = Some(node); 
            self.size += 1;
        }else {
            self.head = Some(Rc::clone(&node));
            self.tail = Some(Rc::clone(&node));
            self.size = 1;
        }
        
    }
	pub fn push_front(&mut self, item: T) {
        let newNode = Rc::new(RefCell::new(Node::new(item)));
        if let Some(currentNode) = self.head.take() {
            currentNode.borrow_mut().prev = Some(Rc::clone(&newNode));
            newNode.borrow_mut().next = Some(currentNode);
            self.head = Some(newNode);
            self.size += 1;
        } else {
            self.head = Some(Rc::clone(&newNode));
            self.tail = Some(newNode);
            self.size = 1;
        }
    }
    
    
	pub fn pop_back(&mut self) -> Option<T> {
        self.tail.take().map(|prev_tail| {
            self.size -= 1;
            match prev_tail.borrow_mut().prev.take() {
                Some(node) => {
                    node.borrow_mut().next = None;
                    self.tail = Some(node);
                }
                None => {
                    self.head.take();
                }
            }
            Rc::try_unwrap(prev_tail).ok().unwrap().into_inner().item
        })
    }

	pub fn pop_front(&mut self) -> Option<T> {
        self.head.take().map(|headNode: Rc<RefCell<Node<T>>>| {
            self.size -= 1;
            match headNode.borrow_mut().next.take() {
                Some(node) => {
                    node.borrow_mut().prev = None;
                    self.head = Some(node);
                },
                None => {
                    self.tail.take();
                }
            }
            Rc::try_unwrap(headNode).ok().unwrap().into_inner().item
        })
    }    

	// Se n e' positivo ritornate l'ennesimo elemento dall'inizio 
    //della lista mentre se e' negativo lo ritornate dalla coda 
	//(-1 e' il primo elemento dalla coda)
	pub fn get(&self, n:i32) -> Option<T> {
        if n!=0 && self.size>0{
            let mut current: Option<Rc<RefCell<Node<T>>>>;
            let mut count: usize = 1;
            let mut newCount = -1;
            
            if n<0 {
                current = self.tail.clone();    
            }else {
                current = self.head.clone();    
            }

            loop {
                match current {
                    Some(ref node) => {
                        if n<0 {
                            if newCount == n {
                                let result = node.borrow_mut().item;
                                return Some(result)
                            }
    
                            if count<self.size {
                                ///node.borrow restituisce un riferimento a node.prev. Questo ritorna un &Option<T>
                                /// per poter ottenere in questo caso il vero valore di prev devo fare l'unwrap la quale
                                /// richiede per forza un Option<&T> che viene fatto tramite as_ref
                                /// infine viene clonato il valore in nextNode
                                let nextNode = Some(node.borrow().prev.as_ref().unwrap().clone());
                                current = nextNode;
                            }
    
                        }else {
                            if count == n.try_into().unwrap() {
                                let result = node.borrow_mut().item;
                                return Some(result)
                            }
                            if count<self.size {
                                let nextNode = Some(node.borrow().next.as_ref().unwrap().clone());
                                current = nextNode;
                            }
                        }
                            
                        newCount-=1;
                        count+=1;  
                    },
                    None => {
                        return None
                    }
                }
            }    
        }else {
            return None
        }
        
    }
}


pub struct ListIterator<T: Copy>{
    iterator : DoublyPointedList<T>
}

impl<T: Copy> Iterator for ListIterator<T>{
    type Item = T;

    fn next(&mut self) -> Option<Self::Item> {
        self.iterator.pop_front()
    }
}

impl <T:Copy> DoubleEndedIterator for ListIterator<T>{
    
    fn next_back(&mut self) -> Option<Self::Item> {
        self.iterator.pop_back()
    }
}

impl<T:Copy> ListIterator<T>{
    fn new(list: &DoublyPointedList<T>) -> Self{
        ListIterator { iterator : list.clone() }
    }
}

impl<T:Copy> Clone for DoublyPointedList<T>{
    fn clone(&self) -> Self {
        Self { 
            head: self.head.clone(),
            tail: self.tail.clone(),
            size: self.size.clone() 
        }
    }
}

fn main() {}

#[test]
fn testGet() {
    let mut newList = DoublyPointedList::new();
    newList.push_front(50);
    newList.push_front(30);
    newList.push_front(10);
    newList.push_front(150);
    newList.push_front(8);
    
    assert_eq!(Some(10),newList.get(3));
    assert_eq!(Some(50),newList.get(5));
    assert_eq!(Some(30),newList.get(-2));

    //test with Point structure
    let mut newList: DoublyPointedList<Point> = DoublyPointedList::new();
    let point = Point{
        a : 5,
        b : 10
    };

    let mut newPoint = point.clone();
    newPoint.a = 15;

    newList.push_front(point);
    newList.push_front(newPoint);
    assert_eq!(Some(point),newList.get(2));
    assert_eq!(Some(point),newList.get(-1));
    assert_eq!(Some(newPoint),newList.get(1));

    let mut newListEmpty: DoublyPointedList<Point> = DoublyPointedList::new();
    assert_eq!(None,newListEmpty.get(1));
    newListEmpty.push_back(newPoint);
    assert_eq!(Some(newPoint),newListEmpty.get(-1));
}

#[test]
fn testPushFront() {
    let point = Point{
        a : 5,
        b : 10
    };

    let mut newPoint = point.clone();
    newPoint.a = 15;

    let mut list = DoublyPointedList::new();
    list.push_front(point);
    list.push_front(newPoint);
    assert_eq!(Some(newPoint),list.pop_front());
}

#[test]
fn testPushBack(){
    let point = Point{
        a : 5,
        b : 10
    };

    let mut newPoint = point.clone();
    newPoint.a = 25;
    newPoint.b = 10;

    let mut list = DoublyPointedList::new();
    list.push_front(point);
    list.push_front(newPoint);
    assert_eq!(Some(point),list.pop_back());
}
