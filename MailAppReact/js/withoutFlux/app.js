var Folder = React.createClass({
    clickHandler: function () {
        this.props.onClick(this.props.title);
    },
    render: function () {
        var cls = 'folder ';
        console.log(this.props);
        return (
            <div className={cls} onClick={this.clickHandler}>
                <button>{this.props.title}</button>
            </div>
        );
    }
});

var FolderList = React.createClass({

    getInitialState: function () {
        return {folder: []};
    },

    componentDidMount: function () {

        var self = this;
        var url = 'http://localhost:3000/folder';

        $.getJSON(url, function (result) {
            if (!result || !result.length) {
                return;
            }

            var folder = result.map(function (p) {
                if (p) {
                    return {
                        id: p._id,
                        name: p._id
                    };
                }
            });
            self.setState({folder: folder});

        });

    },
    folderClick: function (id) {

        // id holds the ID of the folder that was clicked.
        // Find it in the pictures array, and add it to the favorites

        var folder = this.state.folder;

        for (var i = 0; i < folder.length; i++) {

            if (folder[i].id == id) {

                if (folder[i]) {
                    console.log("clicked: " + folder[i].id);
                    return folder[id];
                }
                break;
            }

        }
        this.setState({folder: folder});

    },
    render: function () {

        var self = this;

        var folder = this.state.folder.map(function (p) {
            return <Folder ref={p.id} title={p.name} onClick={self.folderClick}></Folder>;
        });

        if (!folder.length) {
            folder = <p>Loading Folder..</p>;
        }

        return (
            <div>
                <h1>Folder:</h1>

                <div className="folder"> {{folder}} </div>
            </div>

        );
    }
});

React.render(
    <FolderList />,
    document.body
);