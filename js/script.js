$("document").ready(function() {
    $("#right_click_menu").hide();
    $("#showcase").css("height", $(window).height() - 32);
    // ---------------------mouse right click---------------------
    $("#showcase").mousedown(function(e) {
        if (e.button == 2 && states.current_edit_lock == "unlocked") {
            document.getElementById("showcase").oncontextmenu = function() {
                return false;
            };
            $("#right_click_menu").css("left", e.pageX + 1);
            $("#right_click_menu").css("top", e.pageY + 1);
            $("#right_click_menu").fadeIn(10);
        } else if (e.button == 2 && states.current_edit_lock == "locked") {
            $("#right_click_menu").hide();
            document.getElementById("showcase").oncontextmenu = function() {
                return true;
            };
        }
    });

    $("body").on("click", function() {
        $("#right_click_menu").fadeOut(10);
    });

    $("#right_click_menu [name='add_node']").on("click", function() {
        consolePop("left-click in the white space to place a new node");
        showcase.addNodeMode();
    });
    $("#right_click_menu [name='edit_node']").on("click", function() {
        showcase.editNode();
    });
    $("#right_click_menu [name='add_edge']").on("click", function() {
        consolePop("drag from one node to another node to connect them");
        showcase.addEdgeMode();
    });
    $("#right_click_menu [name='edit_edge']").on("click", function() {
        consolePop("drag the end of the edge to another node");
        showcase.editEdgeMode();
    });

    $("#right_click_menu [name='delete_selected']").on("click", function() {
        consolePop("The selected element has been deleted");
        showcase.deleteSelected();
    });

    // ---------------------toolbar buttons---------------------
    // basic buttons
    $("#toolbar [name='add_node']").on("click", function() {
        consolePop("left-click in the white space to place a new node");
        showcase.addNodeMode();
    });
    $("#toolbar [name='edit_node']").on("click", function() {
        showcase.editNode();
    });
    $("#toolbar [name='add_edge']").on("click", function() {
        consolePop("drag from one node to another node to connect them");
        showcase.addEdgeMode();
    });
    $("#toolbar [name='edit_edge']").on("click", function() {
        consolePop("drag the end of the edge to another node");
        showcase.editEdgeMode();
    });
    $("#toolbar [name='delete_selected']").on("click", function() {
        consolePop("The selected element has been deleted");
        showcase.deleteSelected();
    });

    //layout
    $("#toolbar [name='change_layout']").on("click", function() {
        $("#console").html("");
        $("#console").hide();
        var edit_node_shape_selector = $(
            '<span>&nbsp;Select Layout:&nbsp;</span><select id="change_layout" class="form-control"><option value="default">default</option><option value="up-down">up-down</option><option value="left-right">left-right</option><option value="right-left">right-left</option><option value="down-up">down-up</option></select>'
        );
        $("#console").append(
            edit_node_shape_selector,
            '&nbsp;<div class="button-wrapper"><button type="button" class="btn btn-success btn-sm" id="change_layout_confirm">confirm</button></div>',
            '&nbsp;<div class="button-wrapper"><button type="button" class="btn btn-danger btn-sm" id="change_layout_cancel">cancel</button></div>'
        );
        $("#change_layout").val(states.current_layout);
        $("#console").fadeIn(250);
        $("#change_layout_confirm").on("click", function() {
            switch ($("#change_layout").val()) {
                case "up-down":
                    var updateOptions = {
                        layout: {
                            hierarchical: {
                                enabled: true,
                                direction: "UD",
                                sortMethod: "directed",
                                nodeSpacing: 200,
                                edgeMinimization: true
                            }
                        },
                        edges: {
                            smooth: {
                                enabled: true,
                                type: "cubicBezier",
                                forceDirection: "vertical",
                                roundness: 0.5
                            }
                        }
                    }
                    showcase.setOptions(updateOptions);
                    states.current_layout = "up-down";
                    break;
                case "left-right":
                    var updateOptions = {
                        layout: {
                            hierarchical: {
                                enabled: true,
                                direction: "LR",
                                sortMethod: "directed",
                                nodeSpacing: 100,
                                edgeMinimization: true
                            }
                        },
                        edges: {
                            smooth: {
                                enabled: true,
                                type: "cubicBezier",
                                forceDirection: "horizontal",
                                roundness: 0.5
                            }
                        }
                    }
                    showcase.setOptions(updateOptions);
                    states.current_layout =
                        "left-right";
                    break;
                case "right-left":
                    var updateOptions = {
                        layout: {
                            hierarchical: {
                                enabled: true,
                                direction: "RL",
                                sortMethod: "directed",
                                nodeSpacing: 100,
                                edgeMinimization: true
                            }
                        },
                        edges: {
                            smooth: {
                                enabled: true,
                                type: "cubicBezier",
                                forceDirection: "horizontal",
                                roundness: 0.5
                            }
                        }
                    }
                    showcase.setOptions(updateOptions);
                    states.current_layout =
                        "right-left";
                    break;
                case "down-up":
                    var updateOptions = {
                        layout: {
                            hierarchical: {
                                enabled: true,
                                direction: "DU",
                                sortMethod: "directed",
                                nodeSpacing: 200,
                                edgeMinimization: true
                            }
                        },
                        edges: {
                            smooth: {
                                enabled: true,
                                type: "cubicBezier",
                                forceDirection: "vertical",
                                roundness: 0.5
                            }
                        }
                    }
                    showcase.setOptions(updateOptions);
                    states.current_layout = "down-up";
                    break;
                case "default":
                    var updateOptions = {
                        layout: {
                            hierarchical: {
                                enabled: false,
                                direction: "LR",
                                sortMethod: "directed",
                                nodeSpacing: 100,
                                edgeMinimization: true
                            }
                        },
                        edges: {
                            smooth: {
                                enabled: true,
                                type: "cubicBezier",
                                forceDirection: "horizontal",
                                roundness: 0.5
                            }
                        }
                    }
                    showcase.setOptions(updateOptions);
                    states.current_layout = "default";
                    break;
                default:
                    states.current_layout = "default";
                    break;
            }
            $("#console").fadeOut("50");
        });
        $("#change_layout_cancel").on("click", function() {
            $("#console").fadeOut("50");
        });
    });

    // lock
    $('#edit_lock').change(function() {
        if (states.current_edit_lock == "unlocked") {
            var updateOptions = {
                interaction: {
                    keyboard: false,
                    navigationButtons: true,
                    zoomView: false,
                    dragView: false,
                    dragNodes: false
                }
            };
            showcase.setOptions(updateOptions);
            states.current_edit_lock = "locked";
            $("#toolbar .btn-group").fadeOut(500);
            $(".vis-navigation").fadeOut(500);
            consolePop("view is locked");
        } else {
            var updateOptions = {
                interaction: {
                    keyboard: true,
                    navigationButtons: true,
                    zoomView: true,
                    dragView: true,
                    dragNodes: true
                }
            };
            showcase.setOptions(updateOptions);
            states.current_edit_lock = "unlocked";
            $("#toolbar .btn-group").fadeIn(500);
            $(".vis-navigation").fadeIn(500);
            consolePop("view is unlocked");
        }
    });
});

function consolePop(text) {
    $("#console").hide();
    $("#console").html(text);
    $("#console").fadeIn(500);
    setTimeout(function() {
        $("#console").fadeOut(1000);
    }, 1500);
}
