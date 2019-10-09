const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        let node = new Node(data);

        if (!this.length) {
            this._head = node;
        } else {
            this._tail.next = node;
            node.prev = this._tail;
        }

        this._tail = node;
        ++this.length;

        return this;
    }

    head() {
        return (!this._head) ? this._head : this._head.data;
    }

    tail() {
        return (!this._tail) ? this._tail : this._tail.data;
    }

    at(index) {
        if (index < this.length) {
            let currentNode = this._head;
            let currentIndex = 0;

            while (currentIndex !== index) {
                currentNode = currentNode.next;
                ++currentIndex;
            }
            return currentNode.data;

        } else new Throw('The node with the specified index does not exist');
    }

    insertAt(index, data) {
        if (this.length === 0 || this.length === index - 1) {
            this.append(data);
        } else {
            let node = new Node(data);

            let currentNode = this._head;
            let currentIndex = 0;

            while (currentIndex < index) {
                currentNode = currentNode.next;
                ++currentIndex;
            }

            let prevNode = currentNode.prev;
            let nextNode = currentNode;

            prevNode.next = node;
            node.prev = prevNode;
            node.next = nextNode;
            ++this.length;

            return this;
        }
    }

    isEmpty() {
        return !this.length || false;
    }

    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;

        return this;
    }

    deleteAt(index) {
        if (index < this.length) {
            let currentNode = this._head;
            let currentIndex = 0;

            while (currentIndex < index) {
                currentNode = currentNode.next;
                ++currentIndex;
            }
            let prevNode = currentNode.prev;
            let nextNode = currentNode.next;

            if (!prevNode && !nextNode) {
                this.clear();
                return this;
            }

            if (!prevNode) {
                nextNode.prev = null;
            } else if (!nextNode) {
                prevNode.next = null;
            } else {
                prevNode.next = nextNode;
                nextNode.prev = prevNode;
            }
            --this.length;

            return this;
        } else new Throw('index does not exist');
    }

    reverse() {
        if (this.length > 1) {
            let currentNode = this._tail;
            let currentIndex = 0;

            while (currentIndex < this.length) {
                let newPrev = currentNode.next;
                let newNext = currentNode.prev;

                currentNode.prev = newPrev;
                currentNode.next = newNext;
                currentNode = currentNode.next;
                ++currentIndex;
            }

            let newTail = this._head;

            this._head = this._tail;
            this._tail = newTail;
        }

        return this;
    }

    indexOf(data) {
        let currentNode = this._head;
        let currentIndex = 0;

        if (this.length === 1 && currentNode.data !== data) return -1;

        while (currentIndex < this.length) {
            if (currentNode.data === data) return currentIndex;

            ++currentIndex;
            currentNode = currentNode.next;
        }
        return -1;
    }
}

module.exports = LinkedList;
