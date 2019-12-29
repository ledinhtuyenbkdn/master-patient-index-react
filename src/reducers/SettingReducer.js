import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    settings: [
        {
            id: 1,
            mpiKey: "ALGORITHM",
            mpiValue: "1",
            description: "Thuật toán"
        },
        {
            id: 2,
            mpiKey: "MANUAL_MATCH_SCORE",
            mpiValue: "60",
            description: "Điểm manual match"
        },
        {
            id: 3,
            mpiKey: "AUTO_MATCH_SCORE",
            mpiValue: "80",
            description: "Điểm auto match"
        }
    ],
    fieldWeights: [
        {
            id: 1,
            field: "FULL_NAME",
            weight: 40
        },
        {
            id: 2,
            field: "HEALTH_INSURANCE_NUMBER",
            weight: 0
        },
        {
            id: 3,
            field: "IDENTIFICATION_NUMBER",
            weight: 0
        },
        {
            id: 4,
            field: "ADDRESS",
            weight: 20
        },
        {
            id: 5,
            field: "DATE_OF_BIRTH",
            weight: 20
        },
        {
            id: 6,
            field: "GENDER",
            weight: 20
        }
    ],
    blockingRounds: [],
    loading: false,
    error: null
};

export default function settingReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ALL_SETTINGS.LOADING:
            return {
                ...state, loading: true
            };
        case actionTypes.GET_ALL_SETTINGS.SUCCESS:
            return {
                ...state,
                settings: action.settings,
                fieldWeights: action.fieldWeights,
                blockingRounds: action.blockingRounds,
                loading: false,
                error: null
            };
        case actionTypes.GET_ALL_SETTINGS.FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.CHANGE_ALGORITHM:
            let updatedAlgorithmStated = JSON.parse(JSON.stringify(state));
            updatedAlgorithmStated.settings[0].mpiValue = action.id;
            return updatedAlgorithmStated;
        case actionTypes.CHANGE_MANUAL_SCORE:
            let updatedManualScoreStated = JSON.parse(JSON.stringify(state));
            updatedManualScoreStated.settings[1].mpiValue = action.score;
            return updatedManualScoreStated;
        case actionTypes.CHANGE_AUTO_SCORE:
            let updatedAutoScoreStated = JSON.parse(JSON.stringify(state));
            updatedAutoScoreStated.settings[2].mpiValue = action.score;
            return updatedAutoScoreStated;
        case actionTypes.CHANGE_FIELD_WEIGHT:
            let updatedFieldWeightStated = JSON.parse(JSON.stringify(state));
            updatedFieldWeightStated.fieldWeights[action.index].weight = action.weight;
            return updatedFieldWeightStated;
        case actionTypes.SAVE_ALL_SETTINGS.LOADING:
        case actionTypes.SAVE_ALL_SETTINGS.SUCCESS:
        case actionTypes.SAVE_ALL_SETTINGS.FAIL:
            return state;
        case actionTypes.CREATE_BLOCKING_ROUND:
            let createBlockingRoundStated = JSON.parse(JSON.stringify(state));
            createBlockingRoundStated.blockingRounds.push(action.blockingRound);
            return createBlockingRoundStated;
        case actionTypes.DELETE_BLOCKING_ROUND:
            let updatedBlockingRoundStated = JSON.parse(JSON.stringify(state));
            updatedBlockingRoundStated.blockingRounds = updatedBlockingRoundStated.blockingRounds.filter(blockingRound => {
                return blockingRound.id !== action.id
            });
            return updatedBlockingRoundStated;
        default:
            return state;
    }
}