use std::{cell::RefCell, rc::Rc, fmt::Display};
#[derive(Default)]
struct Node<T:Copy> {
	item: T,
	next: Pointer<T>,
	prev: Pointer<T>,
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
        let mut current = self.head.clone();
        let mut count: usize = 1;
        if n!=0 {
            if n>0 {
                loop {
                    match current {
                        Some(ref node) => {
                            if count == n.try_into().unwrap() {
                                let result = node.borrow_mut().item;
                                return Some(result)
                                //return Some(Rc::try_unwrap(current?).ok().unwrap().into_inner().item)
                            }
        
                            if count<self.size {
                                let nextNode = Some(node.borrow_mut().next.as_ref().unwrap().clone());
                                current = nextNode;
                            }
        
                            count+=1;
                        },
                        None => {
        
                        }
                    }
                }
            }else {
                current = self.tail.clone();
                let mut newCount = -1;
                loop {
                    match current {
                        Some(ref node) => {
                            if newCount == n.try_into().unwrap() {
                                let result = node.borrow_mut().item;
                                return Some(result)
                                //return Some(Rc::try_unwrap(current?).ok().unwrap().into_inner().item)
                            }
        
                            if count<self.size {
                                let nextNode = Some(node.borrow_mut().prev.as_ref().unwrap().clone());
                                current = nextNode;
                            }
                            
                            newCount-=1;
                            count+=1;
                        },
                        None => {
                            return None
                        }
                    }
                }
            }
            
        }else {
            None
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


fn main() {
    let mut newList = DoublyPointedList::new();
    newList.push_front(50);
    newList.push_front(30);
    newList.push_front(10);
    newList.push_front(150);
    newList.push_front(8);
    
    newList.get(3);
    
}

#[test]
fn iterate() {
    let mut newList = DoublyPointedList::new();
    newList.push_front(50);
    newList.push_front(30);
    newList.push_front(10);
    newList.push_front(150);
    newList.push_front(8);
    
    assert_eq!(Some(10),newList.get(3));
    assert_eq!(Some(50),newList.get(5));
    assert_eq!(Some(30),newList.get(-2));
}
