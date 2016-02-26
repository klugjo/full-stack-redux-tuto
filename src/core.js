import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

function getWinners(vote) {

    if(!vote) {return [];}
    const [a ,b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);

    if(aVotes > bVotes) {
        return [a];
    } else if (bVotes > aVotes) {
        return [b];
    } else {
        // draw
        return [a, b];
    }
}

export function next(state) {

    const entries = state.get('entries')
        .concat(getWinners(state.get('vote')));

    if(entries.size === 1) {
        return state.remove('vote')
            .remove('entries')
            .set('winner', entries.first());
    }

    return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
    });
}

export function vote(state, entry) {
    return state.updateIn(
        ['vote', 'tally', entry], // path to property: vote.tally[entry]
        0, // default value if not set
        tally => tally + 1 // operation
    );
}