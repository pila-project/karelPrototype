import React, { Component } from 'react';
import { connect } from 'react-redux';
import { problemComplete, updateCurrentView, updateItem, timedOut, updateCountdown } from 'redux/actions'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Swal from 'sweetalert2'
import {fireSuccessSwal} from 'Components/Util/SuccessSwal.js'
import Curriculum from 'Curriculum/Curriculum.js'
import {translate} from 'redux/translator.js'

import  ClockRender from '../Util/countdownTimer.js'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {faPlay} from '@fortawesome/free-solid-svg-icons'
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons'
import {faPuzzlePiece} from '@fortawesome/free-solid-svg-icons'

const mapDispatchToProps = {
  onUpdateCurrentView: (view) => updateCurrentView(view),
  onUpdateItem: (item) => updateItem(item),
  onProblemComplete: (item) => problemComplete(item),
  onTimeOut: () => timedOut(),
  onUpdateCountdown: (time) => updateCountdown(time),
};

const mapStateToProps = (state, ownProps) => {
  const moduleName = state.module;
  var pageState = state[moduleName];
  const savedXml = selectCodeByCurrentView(pageState);
  const studentState = pageState.studentState;
  const currentView = pageState.currentView;
  const countdown = pageState.countdown;
  const item = pageState.item;
  const world = pageState.world;
  const solvedWorlds = pageState.solvedWorlds;
  return { studentState , currentView, savedXml, countdown, item, moduleName, world, solvedWorlds};
}


class MultipleChoiceImagesTemplate extends Component{
    constructor(props) {
        super(props);
        this.state = { activeChoiceIds: [] }
    }

    // HTML OUTPUT SECTIONS
    topImageDivs = () => (this.props.question.questionHeaderImages
        .filter(el => el.imageId)
        .map((el,i) => (
        // <span key={'top-region-' + i}>{el.imageId ? el.imageId : 'no image'}</span>
        <div className="q-image-area" key={`header-image-area-${i}`}>
            <h4>{el.imageHeader}</h4>
            <img className="header-img fit-header-img"
                draggable="false"
                src={`/images/${el.imageId}.png`}
            />
        </div>
    )))

    instructionsDiv = () => (
        <div className="instructionsBox instructionBlue">
            <span><b>Instructions:</b> {this.props.question.questionText}</span>
        </div>
    )

    answerDivs = () => this.props.question.choices.map((choice,i) => (
        <div className={`answer ${this.state.activeChoiceIds.includes(choice.imageId) ? 'active' : ''}`}
            key={choice.imageId}
            onClick={() => this.addOrRemoveFromSelected(choice.imageId)}
        >
            <span>{this.indexToLetterChoice(i)}</span>
            <img className="choice-img fit-choice-img"
                src={`/images/${choice.imageId}.png`}
                draggable="false"
            />
        </div>
    ))

    // Helper Methods
    indexToLetterChoice(index) {
        const correlations = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
        return correlations[index]
      }
    addOrRemoveFromSelected(id) {
        if (this.state.activeChoiceIds.includes(id)) { // remove id if present
        this.setState({
            activeChoiceIds: this.state.activeChoiceIds.filter(item => item != id)
        })
        } else { // add id if not present
        this.setState({
            activeChoiceIds: [ ...this.state.activeChoiceIds, id ]
        })
        }
    }
    handleSubmit() {
        // TODO, Instead of this placeholder, handle the submission however you want.
        alert(this.isCorrect() ? 'Woo!' : 'Boo')
    }
    correctAnswerIds() {
        // return an array with the ids of all correct (needed) choices
        return this.props.question.choices.filter(choice => choice.isCorrect).map(choice => choice.imageId)
    }
    isCorrect() {
        // correct if learner answer array has all elements needed AND no extra (incorrect) ones
        const hasAllAnswers = this.correctAnswerIds().every(el => this.state.activeChoiceIds.includes(el))
        const hasOnlyAnswers = this.state.activeChoiceIds.every(el => this.correctAnswerIds().includes(el))
        return hasAllAnswers && hasOnlyAnswers
    }

    // Assembled HTML Output
    render() {
        return (
            <div className="multiple-choice-images-component">

                <div className="header-images-wrapper">
                    {this.topImageDivs()}
                </div>

                {this.instructionsDiv()}

                <div className="answer-wrapper">
                    {this.answerDivs()}
                </div>

                <button onClick={() => this.handleSubmit()}>Submit</button>

            </div>
        )
    }
}

export default MultipleChoiceImagesTemplate
