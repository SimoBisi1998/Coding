use std::{rc::Rc, cell::RefCell, borrow::BorrowMut, ops::{DerefMut, Deref}};


pub struct Node<T>{
    item : T,
    next : Option<Rc<RefCell<Node<T>>>>,
    prev : Option<Rc<RefCell<Node<T>>>>
}

struct DoublePointedList<T>{
    head : Option<Rc<RefCell<Node<T>>>>,
    tail : Option<Rc<RefCell<Node<T>>>>,
    size : usize
}

pub struct NodeRef<T>(RefCell<Node<T>>);

impl<T> Deref for NodeRef<T> {
    type Target = RefCell<Node<T>>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl<T> DerefMut for NodeRef<T> {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}



impl<T> DoublePointedList<T>{
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

}

impl<T> Node<T>{
    fn new(item : T) -> Self {
        Self { item: item, next: None, prev: None }
    }
}



fn main() {
    let mut list = DoublePointedList::new();
    list.push_front(String::from("ciao"));
    list.push_front(String::from("bella zio"));

    let mut newlist = DoublePointedList::new();
    newlist.push_back(String::from("ciao"));
    newlist.push_back(String::from("bella zio"));
    
}
