$("document").ready(function () {
    $("#showcase").css("height", $(window).height() - 32);
    $("#right_click_menu").hide();
    document.getElementById("showcase").oncontextmenu = function () {
        return false;
    };
    $("#showcase").mousedown(function (e) {
        if (e.button == 2) {
            $("#right_click_menu").css("left", e.pageX + 1);
            $("#right_click_menu").css("top", e.pageY + 1);
            $("#right_click_menu").fadeIn(10);
        }
    });
    $("body").on("click", function () {
        $("#right_click_menu").fadeOut(10);
    });

    $("#right_click_menu [name='add_node']").on("click", function () {
        showcase.addNodeMode();
    });
    $("#right_click_menu [name='edit_node']").on("click", function () {
        showcase.editNode();
    });
    $("#right_click_menu [name='add_edge']").on("click", function () {
        showcase.addEdgeMode();
    });
    $("#right_click_menu [name='edit_edge']").on("click", function () {
        showcase.editEdgeMode();
    });
    $("#right_click_menu [name='delete_selected']").on("click",
        function () {
            showcase.deleteSelected();
        });

    $("#toolbar [name='add_node']").on("click", function () {
        showcase.addNodeMode();
    });
    $("#toolbar [name='edit_node']").on("click", function () {
        showcase.editNode();
    });
    $("#toolbar [name='add_edge']").on("click", function () {
        showcase.addEdgeMode();
    });
    $("#toolbar [name='edit_edge']").on("click", function () {
        showcase.editEdgeMode();
    });
    $("#toolbar [name='delete_selected']").on("click", function () {
        showcase.deleteSelected();
    });

    $("#toolbar [name='change_layout']").on("click", function () {
        $("#console").html("");
        var edit_node_shape_selector = $(
            '<span>&nbsp;Select Layout:&nbsp;</span><select id="change_layout" class="form-control"><option value="default">default</option><option value="up-down">up-down</option><option value="left-right">left-right</option><option value="right-left">right-left</option><option value="down-up">down-up</option></select>'
        );
        $("#console").append(
            edit_node_shape_selector,
            '&nbsp;<div class="button-wrapper"><button type="button" class="btn btn-success btn-sm" id="change_layout_confirm">confirm</button></div>',
            '&nbsp;<div class="button-wrapper"><button type="button" class="btn btn-danger btn-sm" id="change_layout_cancel">cancel</button></div>'
        );
        $("#console").css("left", "2px");
        $("#console").css("bottom", "2px");

        $("#change_layout").val(current_layout);

        $("#change_layout_confirm").on("click", function () {
            switch ($("#change_layout").val()) {
                case "up-down":
                    options.layout.hierarchical.direction = "UD";
                    options.layout.hierarchical.enabled = true;
                    options.layout.hierarchical.nodeSpacing = 200;
                    options.edges.smooth.forceDirection = "vertical";
                    showcase.setOptions(options);
                    current_layout = "up-down";
                    break;
                case "left-right":
                    options.layout.hierarchical.direction = "LR";
                    options.layout.hierarchical.enabled = true;
                    options.layout.hierarchical.nodeSpacing = 100;
                    options.edges.smooth.forceDirection = "horizontal";
                    showcase.setOptions(options);
                    current_layout = "left-right";
                    break;
                case "right-left":
                    options.layout.hierarchical.direction = "RL";
                    options.layout.hierarchical.enabled = true;
                    options.layout.hierarchical.nodeSpacing = 100;
                    options.edges.smooth.forceDirection = "vertical";
                    showcase.setOptions(options);
                    current_layout = "right-left";
                    break;
                case "down-up":
                    options.layout.hierarchical.direction = "DU";
                    options.layout.hierarchical.enabled = true;
                    options.layout.hierarchical.nodeSpacing = 200;
                    options.edges.smooth.forceDirection = "horizontal";
                    showcase.setOptions(options);
                    current_layout = "down-up";
                    break;
                case "default":
                    options.layout.hierarchical.enabled = false;
                    options.edges.smooth = {};
                    showcase.setOptions(options);
                    current_layout = "default";
                    break;
                default:
                    current_layout = "default";
                    break;
            }
            console.log(options);
            $("#console").html("");
        });
        $("#change_layout_cancel").on("click", function () {
            $("#console").html("");
        });
    });
});
