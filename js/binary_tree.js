class BinaryTree {      
    // inicializa a raiz como nula
    constructor() {                      //Criação do construtor
        this.root = null                 //A raiz da Arvore recebe null
    }

    //exibe o menor valor da arvore
    min() {                     //Criação da função
        let current = this.root //current recebe o valor da raiz 
        if (current == null)    // Verifica se current é igual a null
            return null         //Caso seja, retorna null
        while (current.left != null)    //Enquanto o valor da esquerda do nó for diferente de nulo current recebe o seu valor
            current = current.left      //current recebe o valor da esquerda do nó
        return current.content          //Retorna o valor de current extraído da repetição (while)
    }

    //exibe o maior valor da arvore
    max() {                     //Criação da função
        let current = this.root                                 //current recebe o valor da raiz 
        if (current == null)                                    //Verifica se current é igual a null
            return null                                         //Caso seja, retorna null
        while (current.right != null)                           //Enquanto o valor da direita do nó for diferente de nulo current recebe o seu valor
            current = current.right                             //current recebe o valor da direita do nó
        return current.content                                  //Retorna o valor de current extraído da repetição (while)
    }

    //insere o elemento da arvores
    insert(element) {                                           //Método de inserção do elemento na árvore 
        this.root = this.insertNode(this.root, element)         //Inicia o método a partir da raiz
    }

    insertNode(rootNode, element) {             //Chama a função e recebe os parâmetros
        if (rootNode == null)                   //Verifica se o nó raiz(valor já inserido) é igual a null
            return new Node(element)            //Caso seja, Node recebe o novo valor(element)
        if (element > rootNode.content)         //Verifica se o valor do novo elemento é maior que o valor do elemento antes adicionado
            rootNode.right = this.insertNode(rootNode.right, element)   //Caso seja, element será adicionado à direita de rootNode
        else                                                            //
            rootNode.left = this.insertNode(rootNode.left, element)     //Caso não seja, element será adicionado à esquerda de rootNode 
        return rootNode                                                 //Retorna o valor de rootNode
    }

    
    inOrderTraverse(callback) {                      //Executa a função callback para cada nó, em ordem
        this.inOrderVisitor(this.root, callback)     //Inicia o método a partir da raiz
    }

    inOrderVisitor(node, callback) {
        if (node == null)                           //Verifica se node é igual a null
            return                                  //Caso seja, encerra a função
        this.inOrderVisitor(node.left, callback)    
        callback(node.content)
        this.inOrderVisitor(node.right, callback)
    }

    
    preOrderTraverse(callback) {                    //Executa a função callback para cada nó, em pré-ordem
        this.preOrderVisitor(this.root, callback)   //Inicia o método a partir da raiz
    }

    preOrderVisitor(node, callback) {
        if (node == null)
            return
        callback(node.content)
        this.preOrderVisitor(node.left, callback)
        this.preOrderVisitor(node.right, callback)
    }

    
    postOrderTraverse(callback) {                   //Executa a função callback para cada nó, em pós-ordem
        this.postOrderVisitor(this.root, callback)  //Inicia o método a partir da raiz
    }

    postOrderVisitor(node, callback) {
        if (node == null)
            return
        this.postOrderVisitor(node.left, callback)
        this.postOrderVisitor(node.right, callback)
        callback(node.content)
    }

     
    
    
    //    2. É igual ao conteúdo? achou
    //    3. É maior que o conteúdo?
    //       3.1 busca de direita
    //       3.2 busca na esquerda

    search(value) {                                        //Busca na árvore binária
        return this.searchVisitor(this.root, value)        //Inicia o método a partir da raiz
    }

    searchVisitor(node, element) {
        if (node == null)                           //Verifica se o o elemento é nulo
            return false                            //Caso seja, o elemento não existe
        if (node.content == element)                //Verifica se o valor é igual ao conteúdo
            return true;                            //Retorna true se o valor já existe na arvore
        if (element > node.content)                 //Verifica se o elemento é maior que o conteúdo
            return this.searchVisitor(node.right, element)  //Caso seja, busca na direita
        else                                                //Se não
            return this.searchVisitor(node.left, element)   //Busca na esquerda
    }

    //Remove um elemento existente na arvore o retorna
    remove(value) {                                          
        this.root = this.removeVisitor(this.root, value)    //Inicia o método a partir da raiz
    }

    removeVisitor(node, value) {                //Recebe os parâmetros
        if (node.content == value) {            //Verifica se o nó é igual ao valor
            if (node.left == node.right) {      //Verifica se o nó da esquerda é igual ao nó da direita
                //nao tem filhos - Grau 0
                return null                     //Caso seja, retorna null
            } else if (node.right == null) {    //Verifica se o nó da direita é igual a null
                //não tem filhos na direita, e tem nó na esqueda - Grau 1
                return node.left                
            } else if (node.left == null) {     //Verifica se o nó da esquerda é igual a null
                //não tem filhos da esquerda, e tem nó da direita - Grau 1
                return node.right
            } else {
                // tem os dois ramos - Grau 2
                const newRoot = node.right
                let current = node.right;
                while (current.left != null)
                    current = current.left
                current.left = node.left
                return newRoot;
            }
        } else if (value < node.content) {
            node.left = this.removeVisitor(node.left, value)
        } else {
            node.right = this.removeVisitor(node.right, value)
        }
        return node;
    }

    //exibe a altura da arvore
    height() {
        return this.heightVisitor(this.root)    //Inicia o método a partir da raiz
    }

    heightVisitor(node) {                       //
        if (!node)                              //Verifica se há algum nó
            return -1                           //Caso esteja vazio, retorna -1
        let leftHeight = this.heightVisitor(node.left),     //Variável recebe tamanho da altura à esquerda
            rightHeight = this.heightVisitor(node.right)    //Variável recebe tamanho da altura à direita
        return Math.max(leftHeight, rightHeight) + 1        //Retorna o maior valor entre os valores da esquerda e direita, e soma +1 
    }

    // informa quantos nós existem na arvore
    size() {
        return this.sizeVisitor(this.root)      //Inicia o método a partir da raiz
    }

    sizeVisitor(node) {
        if (!node)           //Verifica se há algum nó
            return 0         //Caso esteja vazio, retorna 0
        return this.sizeVisitor(node.left) + this.sizeVisitor(node.right) + 1   //Retorna a soma do tamanho da esquerda mais o tamanho da direita, e soma +1
    }
}
