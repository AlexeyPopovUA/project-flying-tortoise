import "./../../styles/components/Footer.scss";

export default class Footer {
    render() {
        return (
            <div className="footer">
                <div className="author">Developed by O.Popov, 2018</div>
                <div className="sources">
                    <a href="https://github.com/AlexeyPopovUA/project-flying-tortoise">GitHub sources</a>
                </div>
            </div>
        );
    }
}