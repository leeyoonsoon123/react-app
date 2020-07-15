import React, {Component} from 'react';
import Modal from '../Modal';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            isClicked: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    
    componentDidMount() {
        
    }

    toggleModal() {
        const now = this.state.isClicked;
        this.setState({isClicked:!now});
    }

    render() {
        const isClicked = this.state.isClicked;
        let M;

        if (isClicked) {
            M = <Modal 
            toggleFunction={this.toggleModal}
            />;
        }
        else {
            M = null;
        }

        return (
            <section className="title">
                <div className="title-container">
                    <h2 className="Regular-heading">친구와 함께하는 색다른 시간</h2>
                    <h2 className="Big-heading">딜리어스와 함께.</h2>
                    <h3 className="Small-heading">세계 최초 그룹 데이팅 앱</h3>

                    <button className="btn btn-dark btn-lg download-button"
                    onClick={this.toggleModal}>
                        <span>지금 시작하기 &nbsp;&nbsp;</span>
                    </button>
                </div>
                {M}
            </section>
        )
    }
}

export default Home;
