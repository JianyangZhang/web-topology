var showcase;

// create nodes
var nodes = new vis.DataSet([{
    id: 1,
    label: 'alpha'

}, {
    id: 2,
    label: 'bravo'
}, {
    id: 3,
    label: 'charlie'
}, {
    id: 4,
    label: 'delta'
}, {
    id: 5,
    label: 'echo'
}]);

// create edges
var edges = new vis.DataSet([{
    from: 1,
    to: 2
}, {
    from: 2,
    to: 3
}, {
    from: 2,
    to: 4
}, {
    from: 2,
    to: 5
}]);

// create a container
var container = document.getElementById('showcase');

// provide the data
var data = {
    nodes: nodes,
    edges: edges
};

// options
var options = {
    locale: "en",
    autoResize: true,
    clickToUse: false,
    nodes: {
        shape: 'circularImage',
        brokenImage: "./img/pokeball.png",
        image: "./img/pokeball.png",
        size: 20,

        physics: false,
        shadow: false,
        color: {
            border: "black",
            background: "#C6C6C6",
            highlight: {
                border: "#58BB12",
                background: "#C6C6C6",
            }
        }
    },
    edges: {
        color: {
            color: "black",
            highlight: "#58BB12"
        },
        arrows: {
            to: {
                enabled: true,
                scaleFactor: 0,
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
    },
    manipulation: {
        enabled: true,
        initiallyActive: true,
        addNode: true,
        addEdge: true,
        editNode: function (nodeInfo, callback) {
            var edit_node_shape_selector = $(
                '<select id="edit_node_shape"><option value="origin">stay the same</option><option value="ellipse">ellipse</option><option value="circle">circle</option><option value="database">database</option><option value="box">box</option></select>'
            );
            $("#console").append(
                '<span>Node Label: </span><input type="text" class="form-control" id="edit_node_label" />',
                edit_node_shape_selector,
                '<div class="button-wrapper"><button type="button" class="btn btn-success btn-sm" id="edit_node_confirm">confirm</button></div>',
                '<div class="button-wrapper"><button type="button" class="btn btn-danger btn-sm" id="edit_node_cancel">cancel</button></div>'
            );
            $("#console").css("left", "2px");
            $("#console").css("bottom", "2px");

            $("#edit_node_label").val(nodeInfo.label);
            $("#edit_node_confirm").on("click", function () {
                nodeInfo.label = $("#edit_node_label").val();
                if ($("#edit_node_shape").val() != "origin") {
                    nodeInfo.shape = $("#edit_node_shape").val();
                }
                nodeInfo.shadow = false; // vis.js glitch
                callback(nodeInfo);
                $("#console").html("");
                $("#console").css("height", "0px");
            });
            $("#edit_node_cancel").on("click", function () {
                showcase.disableEditMode();
                showcase.enableEditMode();
                $("#console").html("");
                $("#console").css("height", "0px");
            });
        },
        editEdge: true,
        deleteNode: true,
        deleteEdge: true,
        addNode: function (nodeInfo, callback) {
            nodeInfo.label = "new node";
            callback(nodeInfo);
        }
    },
    layout: {
        hierarchical: {
            enabled: true,
            direction: "LR",
            sortMethod: "directed"
        }
    }
};
// initialize network
showcase = new vis.Network(container, data, options);
