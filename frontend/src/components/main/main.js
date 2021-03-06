import React from 'react';
import NavbarContainer from '../nav/navbar_container';

class MainPage extends React.Component {
    
    render() {
        return (
            <div>
                <p>MERN Project</p>

                <div className="container">

                    <div className="codrops-top">
                        <NavbarContainer />
                        <div className="clr"></div>
                    </div>
        
                    <div className="st-container">

                        <input type="radio" name="radio-set" defaultChecked={false} id="st-control-1" />
                        <a href="#st-panel-1">Serendipity</a>
                        <input type="radio" name="radio-set" id="st-control-2" />
                        <a href="#st-panel-2">Happiness</a>
                        <input type="radio" name="radio-set" id="st-control-3" />
                        <a href="#st-panel-3">Tranquillity</a>
                        <input type="radio" name="radio-set" id="st-control-4" />
                        <a href="#st-panel-4">Positivity</a>
                        <input type="radio" name="radio-set" id="st-control-5" />
                        <a href="#st-panel-5">Passion</a>

                        <div className="st-scroll">

                            <section className="st-panel" id="st-panel-1">
                                <div className="st-deco" data-icon="H"></div>
                                <h2>Serendipity</h2>
                                <p>Banksy adipisicing eiusmod banh mi sed. Squid stumptown est odd future nisi, commodo mlkshk pop-up adipisicing retro.</p>
                            </section>

                            <section className="st-panel st-color" id="st-panel-2">
                                <div className="st-deco" data-icon="2"></div>
                                <h2>Happiness</h2>
                                <p>Art party readymade beard labore cosby sweater culpa. Art party whatever incididunt, scenester umami polaroid tofu.</p>
                            </section>

                            <section className="st-panel" id="st-panel-3">
                                <div className="st-deco" data-icon="B"></div>
                                <h2>Tranquillity</h2>
                                <p>Sint aute occaecat id vice. Post-ironic fap pork belly next level godard, id fanny pack williamsburg forage truffaut.</p>
                            </section>

                            <section className="st-panel st-color" id="st-panel-4">
                                <div className="st-deco" data-icon="x"></div>
                                <h2>Positivity</h2>
                                <p>Mixtape fap leggings art party, butcher authentic farm-to-table you probably haven't heard of them do labore cosby sweater.</p>
                            </section>

                            <section className="st-panel" id="st-panel-5">
                                <div className="st-deco" data-icon="Ç"></div>
                                <h2>Passion</h2>
                                <p>Fixie ad odd future polaroid dreamcatcher, nesciunt carles bicycle rights accusamus mcsweeney's mumblecore nulla irony.</p>
                            </section>

                        </div>

                    </div>

                </div>
            </div>
        );
    }
}
    
export default MainPage;