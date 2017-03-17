$("document").ready(function () {
    $("#showcase").css("height", $(window).height());
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
    $("#right_click_menu [name='delete_node']").on("click", function () {
        showcase.deleteSelected();
    });
    $("#right_click_menu [name='add_edge']").on("click", function () {
        showcase.addEdgeMode();
    });
    $("#right_click_menu [name='edit_edge']").on("click", function () {
        showcase.editEdgeMode();
    });
    $("#right_click_menu [name='delete_edge']").on("click", function () {
        showcase.deleteSelected();
    });
});

/* "alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel", "india", "juliett", "kilo", "lima", "mike", "november", "oscar",
"papa", "quebec", "romeo", "sierra", "tango", "uniform", "victor", "whiskey", "xray", "yankee", "zulu" */
