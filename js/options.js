var showcase;
var current_layout = "default";
// create nodes
/*
--------------------------------------------------
|                      |                         |
|                      |                         |
|      (-,-)           |      (+,-)              |
|                      |                         |
|                      |                         |
|----------------------O-------------------------x
|                      |                         |
|                      |                         |
|      (-,+)           |      (+,+)              |
|                      |                         |
|                      |                         |
|----------------------x-------------------------|
*/
/* "alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel", "india", "juliett", "kilo", "lima", "mike", "november", "oscar",
"papa", "quebec", "romeo", "sierra", "tango", "uniform", "victor", "whiskey", "xray", "yankee", "zulu" */
var nodes = new vis.DataSet([{
    id: 1,
    label: 'alpha-1',
    image: './img/user.png',
    x: -450, // 坐标0，0位于canvas正中间
    y: 0
}, {
    id: 2,
    label: 'bravo-2',
    image: './img/user.png',
    x: -450,
    y: 100
}, {
    id: 3,
    label: 'charlie-3',
    image: './img/user.png',
    x: -450,
    y: 200
}, {
    id: 4,
    label: 'delta-4',
    image: './img/api.png',
    x: -150,
    y: -220
}, {
    id: 5,
    label: 'echo-5',
    image: './img/api.png',
    x: -150,
    y: -50
}, {
    id: 6,
    label: 'foxtrot-6',
    image: './img/api.png',
    x: -150,
    y: 150
}, {
    id: 7,
    label: 'golf-7',
    image: './img/cloud.png',
    x: 150,
    y: 20
}, {
    id: 8,
    label: 'hotel-8',
    image: './img/cloud.png',
    x: 150,
    y: 150
}, {
    id: 9,
    label: 'india-9',
    image: './img/disk.png',
    x: 450,
    y: 0
}, {
    id: 10,
    label: 'juliett-10',
    image: './img/disk.png',
    x: 450,
    y: 250
}]);

// create edges
var edges = new vis.DataSet([{
    from: 1,
    to: 4
}, {
    from: 1,
    to: 5
}, {
    from: 2,
    to: 5
}, {
    from: 2,
    to: 6
}, {
    from: 3,
    to: 6
}, {
    from: 3,
    to: 10
}, {
    from: 4,
    to: 9
}, {
    from: 5,
    to: 7
}, {
    from: 5,
    to: 8
}, {
    from: 7,
    to: 9
}, {
    from: 7,
    to: 10
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
        brokenImage: "./img/default.png",
        image: "./img/default.png",
        size: 20,
        physics: false,
        shadow: false,
        shapeProperties: {
            interpolation: true,
            useImageSize: false
        },
        color: {
            border: "black",
            background: "white",
            highlight: {
                border: "#58BB12",
                background: "#58BB12",
            }
        }
    },
    edges: {
        color: {
            color: "gray",
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
        smooth: {
            enabled: true,
            type: "cubicBezier",
            forceDirection: "horizontal",
            roundness: 0.5
        }
    },
    manipulation: {
        enabled: false,
        initiallyActive: true,
        addNode: true,
        addEdge: true,
        editNode: function (nodeInfo, callback) {
            $("#console").html("");
            var layout_selector = $(
                '<span>&nbsp;Node Shape:&nbsp;</span><select id="edit_node_shape" class="form-control"><option value="origin">stay the same</option><option value="ellipse">ellipse</option><option value="circle">circle</option><option value="database">database</option><option value="box">box</option></select>'
            );
            $("#console").append(
                '<span>Node Label:&nbsp;</span><input type="text" class="form-control" id="edit_node_label" />',
                layout_selector,
                '&nbsp;<div class="button-wrapper"><button type="button" class="btn btn-success btn-sm" id="edit_node_confirm">confirm</button></div>',
                '&nbsp;<div class="button-wrapper"><button type="button" class="btn btn-danger btn-sm" id="edit_node_cancel">cancel</button></div>'
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
            });
            $("#edit_node_cancel").on("click", function () {
                showcase.disableEditMode();
                showcase.enableEditMode();
                $("#console").html("");
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
            enabled: false,
            direction: "LR",
            sortMethod: "directed",
            nodeSpacing: 100,
            edgeMinimization: true
        }
    }
};
// initialize network
showcase = new vis.Network(container, data, options);
