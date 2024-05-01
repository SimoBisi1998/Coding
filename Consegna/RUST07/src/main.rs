use std::{rc::Rc, cell::RefCell, borrow::BorrowMut, ops::{DerefMut, Deref}};
use std::convert::TryInto;



pub struct Node<T:Clone>{
    pub item : T,
    pub next : Option<Rc<RefCell<Node<T>>>>,
    pub prev : Option<Rc<RefCell<Node<T>>>>
}

pub struct DoublePointedList<T:Clone>{
    pub head : Option<Rc<RefCell<Node<T>>>>,
    pub tail : Option<Rc<RefCell<Node<T>>>>,
    pub size : usize
}

impl<T: Clone> Clone for Node<T>{
    fn clone(&self) -> Self {
        Self { item: self.item.clone(), next: self.next.clone(), prev: self.prev.clone() }
    }
}

pub struct NodeRef<T:Clone>(RefCell<Node<T>>);

impl<T:Clone> Deref for NodeRef<T> {
    type Target = RefCell<Node<T>>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl<T:Clone> DerefMut for NodeRef<T> {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}



impl<T:Clone> DoublePointedList<T>{

    /// Crea una nuova istanza di DoublePointedList
    /// # Arguments 
    /// # Examples
    /// ```
    /// let mut list = DoublePointedList::new();
    /// ```
    fn new() -> Self {
        DoublePointedList { head: None, tail: None, size: 0 }
    }

    pub fn is_empty(&self) -> bool {
        if self.size==0 {
            true
        }else {
            false
        }
    }

    pub fn len(&self) -> usize {
        self.size
    }

    pub fn push_back(&mut self, item: T) {
        let mut new_node = Rc::new(RefCell::new(Node::new(item)));
        if let Some(mut currentNode) = self.tail.take() {
            currentNode.borrow_mut().as_ref().borrow_mut().next = Some(Rc::clone(&new_node));
            new_node.borrow_mut().as_ref().borrow_mut().prev = Some(currentNode);
            self.tail = Some(Rc::clone(&new_node));
            self.size += 1;
        } else {
            // Se la lista è vuota, il nuovo nodo diventa sia la testa che la coda
            self.head = Some(Rc::clone(&new_node));
            self.tail = Some(Rc::clone(&new_node));
            self.size = 1;
        }
    }

	pub fn push_front(&mut self, item: T) {
        let mut newNode = Rc::new(RefCell::new(Node::new(item)));
        if let Some(mut node) = self.head.take() {
            node.borrow_mut().as_ref().borrow_mut().prev = Some(Rc::clone(&newNode));
            newNode.borrow_mut().as_ref().borrow_mut().next = Some(node);
            self.head = Some(newNode);
            self.size+=1;
        }else {
            self.head = Some(Rc::clone(&newNode));
            self.tail = Some(Rc::clone(&newNode));
            self.size = 1;
        }
    }

    pub fn pop_back(&mut self) -> Option<T> {
        let x = self.tail.take().map(|mut node| {
            self.size-=1;
            match node.borrow_mut().as_ref().borrow_mut().prev.take() {
                Some(mut currentNode) => {
                    currentNode.borrow_mut().as_ref().borrow_mut().next = None;
                    self.tail = Some(currentNode);
                },
                None => {
                    Some(self.head.take());
                }
            }
            let x: Option<T>= Some(Rc::try_unwrap(node).ok().unwrap().into_inner().item);
            return Some(x)  
        });
        Some(x.unwrap().unwrap().unwrap())   
    }

    pub fn pop_front(&mut self) -> Option<T> {
        let x = self.head.take().map(|mut node| {
            self.size-=1;
            match node.borrow_mut().as_ref().borrow_mut().next.take() {
                Some(mut currentNode) => {
                    currentNode.borrow_mut().as_ref().borrow_mut().prev = None;
                    self.head = Some(currentNode);
                },
                None => {
                    Some(self.tail.take());
                }
            }
            let x: Option<T>= Some(Rc::try_unwrap(node).ok().unwrap().into_inner().item);
            return Some(x)  
        });
        Some(x.unwrap().unwrap().unwrap())   
    }

    // Se n e' positivo ritornate l'ennesimo elemento dall'inizio 
     //della lista mentre se e' negativo lo ritornate dalla coda 
	//(-1 e' il primo elemento dalla coda)
	pub fn get(&mut self, n:i32) -> Option<T> {
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
                    Some(ref mut node) => {
                        if n<0 {
                            if newCount == n {
                                let next_node = node.borrow().next.clone();
                                let prev_node = node.borrow().prev.clone();
                                if let Some(mut next) = next_node.clone() {
                                    next.borrow_mut().as_ref().borrow_mut().prev = prev_node.clone();
                                }else{
                                    self.tail = prev_node.clone();
                                }
                                if let Some(mut prev) = prev_node.clone() {
                                    prev.borrow_mut().as_ref().borrow_mut().next = next_node.clone();
                                }else {
                                    self.head = next_node;
                                }

                                self.size -= 1;
                                
                                return Some(node.borrow_mut().as_ref().borrow_mut().item.clone());
                            }
    
                            if count<self.size {
                                let nextNode = Some(node.borrow().prev.as_ref().unwrap().clone());
                                current = nextNode;
                            }
    
                        }else {
                            if count == n.try_into().unwrap() {
                                let next_node = node.borrow().next.clone();
                                let prev_node = node.borrow().prev.clone();
                                if let Some(mut next) = next_node.clone() {
                                    next.borrow_mut().as_ref().borrow_mut().prev = prev_node.clone();
                                }else{
                                    self.tail = prev_node.clone();
                                }
                                if let Some(mut prev) = prev_node.clone() {
                                    prev.borrow_mut().as_ref().borrow_mut().next = next_node.clone();
                                }else {
                                    self.head = next_node;
                                }

                                self.size -= 1;
                                
                                return Some(node.borrow_mut().as_ref().borrow_mut().item.clone());
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

impl<T:Clone> Node<T>{
    fn new(item : T) -> Self {
        Self { item: item, next: None, prev: None }
    }
}


fn main() {}

#[test]
fn testPushFront() {
    let mut list = DoublePointedList::new();
    list.push_front(String::from("ciao"));
    list.push_front(String::from("bella zio"));
}

#[test]
fn testPopBack() {
    let mut newlist = DoublePointedList::new();
    newlist.push_back(String::from("ciao"));
    newlist.push_back(String::from("bella zio"));
    assert_eq!(Some(String::from("bella zio")),newlist.pop_back());
    newlist.push_front(String::from("comeva"));
    assert_eq!(Some(String::from("comeva")),newlist.pop_front());
    
}

#[test]
fn testPopFront() {
    let mut newlist = DoublePointedList::new();
    newlist.push_front(String::from("ciao"));
    newlist.push_front(String::from("bella zio"));
    assert_eq!(Some(String::from("bella zio")),newlist.pop_front());
    newlist.push_back(String::from("tappo"));
    assert_eq!(Some(String::from("ciao")),newlist.pop_front());
}

#[test]
fn testGet() {
    let mut newlist = DoublePointedList::new();
    newlist.push_front(String::from("pera"));
    newlist.push_front(String::from("banana"));
    assert_eq!(Some(String::from("banana")),newlist.get(1));
    assert_eq!(Some(String::from("pera")),newlist.get(-1));
    newlist.push_back(String::from("mela"));
    assert_eq!(Some(String::from("mela")),newlist.get(-1));
}

#[test]
fn testGetRemove() {
    let mut newlist = DoublePointedList::new();
    newlist.push_front(String::from("pera"));
    newlist.push_front(String::from("banana"));
    newlist.push_front(String::from("mela"));
    assert_eq!(Some(String::from("banana")),newlist.get(2));
    assert_eq!(2,newlist.size);
    assert_eq!(Some(String::from("mela")),newlist.get(1));
    assert_eq!(1,newlist.size);
    newlist.push_back(String::from("fragola"));
    assert_eq!(2,newlist.size);
    assert_eq!(Some(String::from("fragola")),newlist.get(2));
    assert_eq!(1,newlist.size);
    assert_eq!(Some(String::from("pera")),newlist.get(1));
    assert_eq!(0,newlist.size);
    newlist.push_front(String::from("banana"));
    newlist.push_front(String::from("mela"));
    assert_eq!(2,newlist.size);
    assert_eq!(Some(String::from("banana")),newlist.get(-1));
    assert_eq!(1,newlist.size);
}
