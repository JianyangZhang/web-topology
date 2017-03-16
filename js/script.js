$("document").ready(function () {
    var showcase;
    
    // create nodes
    var nodes = new vis.DataSet([{
        id: 1,
        label: 'Node 1'
    }, {
        id: 2,
        label: 'Node 2'
    }, {
        id: 3,
        label: 'Node 3'
    }, {
        id: 4,
        label: 'Node 4'
    }, {
        id: 5,
        label: 'Node 5'
    }]);

    // create edges
    var edges = new vis.DataSet([{
        from: 1,
        to: 2
    }, {
        from: 1,
        to: 3
    }, {
        from: 1,
        to: 4
    }, {
        from: 1,
        to: 5
    }]);

    // create a network
    var container = document.getElementById('showcase');

    // provide the data
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        autoResize: true,
        nodes: {
            shape: 'box',
            physics: false
        },
        edges: {
            arrows: {
                to: {
                    enabled: true,
                    scaleFactor: 0.5,
                    type: 'arrow'
                },
                middle: {
                    enabled: false,
                    scaleFactor: 1,
                    type: 'arrow'
                },
                from: {
                    enabled: false,
                    scaleFactor: 0.01,
                    type: 'circle'
                }
            },
        }
    };

    // initialize network
    showcase = new vis.Network(container, data, options);
});
