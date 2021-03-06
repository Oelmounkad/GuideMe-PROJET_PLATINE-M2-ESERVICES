import React, { useReducer , useContext} from 'react';
import AppContext from './AppContext'
import AppReducer from './AppReducer'

import generalApi from '../../axios/GeneralApi'
import {PERSIST_COMM_PROFILES,
        PERSIST_CHOSEN_PROFILE,
        UPDATE_PROFILE,
        CLEAR_FILTER_REC,
        FILTER_REC_LOC,
        FILTER_REC_THEME,
        PERSIST_RECOMMANDATIONS,
        PERSIST_QUESTIONS,
        FILTER_QUE_LOC,
        FILTER_QUE_THEME,
        CLEAR_FILTER_QUE,
        PERSIST_USER_MEETINGS,
        FILTER_PRO_LOC,
        FILTER_QUE_ALL,
        FILTER_REC_ALL,
        CLEAR_FILTER_PRO,
        PERSIST_CITIES,
        PERSIST_CHOSEN_PROFILE_RATINGS
    } from '../types'
import setAuthToken from '../../utils/setAuthToken'

const AppState = props => {

    const initialState = {
        communityProfiles: [],
        filteredCommunityProfiles: null,
        chosenProfile: null,
        chosenProfileRatings: [],
        recommandations: [],
        filteredRecommandations:null,
        questions: [],
        filteredQuestions: null,
        userMeetings: [],
        cities: []
    }

    

   const [state, dispatch] = useReducer(AppReducer, initialState)

   // Action :

   const getProfiles = async () => {

       try{
        const res = await generalApi.get('/api/profiles')

        dispatch({
            type: PERSIST_COMM_PROFILES,
            payload: res.data
        })

       } catch(err){
           console.log(err.message)
       }

   }

   // get Chosen Profile

   const getChosenProfile = async id => {

    try{
     const res = await generalApi.get(`/api/profiles/user/${id}`)

     dispatch({
         type: PERSIST_CHOSEN_PROFILE,
         payload: res.data
     })

    } catch(err){
        console.log(err.message)
    }

}

  // get Chosen Profile Ratings

  const getChosenProfileRatings = async id => {

    try{
     const res = await generalApi.get(`/api/ratings/${id}`)

     dispatch({
         type: PERSIST_CHOSEN_PROFILE_RATINGS,
         payload: res.data
     })

    } catch(err){
        console.log(err.message)
    }

}


const updateProfile = async data => {
    
    setAuthToken(localStorage.token)
    console.log('Hey update here')
    try{
     
      const res = await generalApi.patch(`/api/profiles/${data._id}`,data)
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
    })

    } catch(err){
        console.log(err.message)
    }

}
const addPhotoToPortfolio = async (data,id) => {
    
    setAuthToken(localStorage.token)
    //console.log('Hey update here')
    try{
     
        const res = await generalApi.patch(`/api/profiles/portfolio/${id}`,data)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
    } catch(err){
        console.log(err.message)
    }

}

const editProfilePhoto = async (data,id) => {
    
    setAuthToken(localStorage.token)
    //console.log('Hey update here')
    try{
     
        const res = await generalApi.patch(`/api/profiles/${id}`,data)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
    } catch(err){
        console.log(err.message)
    }

}

    //get all recommandations

    const getAllRecommandations = async () => {
        try{
     
            const res = await generalApi.get(`/api/recommandations`)
            dispatch({
                type: PERSIST_RECOMMANDATIONS,
                payload: res.data
            })
        } catch(err){
            console.log(err.message)
        }
    }

    // Add recommendation

   const addRecommandation = async data => {
       try {
           setAuthToken(localStorage.token)
           await generalApi.post('/api/recommandations',data)

       } catch (error) {
           console.log(error)
       }
   }


// Comment a recommandation

const commentRecommandation = async (id,data) => {

    try {
        setAuthToken(localStorage.token)
        await generalApi.post(`/api/comments/recommandations/${id}`,data)

    } catch (error) {
        console.log(error)
    }

}


   // Filter Recommandations by Location

   const filterRecByLocation = text => {
    dispatch({type: FILTER_REC_LOC , payload: text })
}

   // Filter Recommandations by Theme

const filterRecByTheme = text => {
    dispatch({type: FILTER_REC_THEME , payload: text })
}


  // Filter recommandation by all

  const filterRecByAll = text => {
    dispatch({type: FILTER_REC_ALL , payload: text })
}
   // Clear Filter Recommandation
   const clearFilterRec = () => {
    dispatch({type: CLEAR_FILTER_REC })
}



//-------------- Question Actions:-------------

  //get all questions

  const getAllQuestions = async () => {
    try{
 
        const res = await generalApi.get(`/api/questions`)
        dispatch({
            type: PERSIST_QUESTIONS,
            payload: res.data
        })
    } catch(err){
        console.log(err.message)
    }
}

// Add question

const addQuestion = async data => {
   try {
       setAuthToken(localStorage.token)
       await generalApi.post('/api/questions',data)

   } catch (error) {
       console.log(error)
   }
}


// Comment a question

const commentQuestion = async (id,data) => {

try {
    setAuthToken(localStorage.token)
    await generalApi.post(`/api/comments/questions/${id}`,data)

} catch (error) {
    console.log(error)
}

}


// Filter Questions by Location

const filterQueByLocation = text => {
dispatch({type: FILTER_QUE_LOC , payload: text })
}

// Filter Questions by Theme

const filterQueByTheme = text => {
dispatch({type: FILTER_QUE_THEME , payload: text })
}

  // Filter question by all

  const filterQueByAll = text => {
    dispatch({type: FILTER_QUE_ALL , payload: text })
}

// Clear Filter Question
const clearFilterQue = () => {
dispatch({type: CLEAR_FILTER_QUE })
}



// Get all user meetings

const getUserMeetings = async () => {


    try{
     setAuthToken(localStorage.token)
     const res = await generalApi.get('/api/meetings')

     dispatch({
         type: PERSIST_USER_MEETINGS,
         payload: res.data
     })

    } catch(err){
        console.log(err.message)
    }
}

const requestMeeting = async(hosterId,data) => {

    try{
     setAuthToken(localStorage.token)
     await generalApi.post(`/api/meetings/${hosterId}`,data)

    } catch(err){
        console.log(err.message)
    }

}

const acceptMeeting = async meetingId => {
    try{
        setAuthToken(localStorage.token)
        let data = {statut : "confirmed"}
        await generalApi.patch(`/api/meetings/${meetingId}`,data)
   
       } catch(err){
           console.log(err.message)
       }

}

const finishMeeting = async meetingId => {
    try{
        setAuthToken(localStorage.token)
        let data = {statut : "finished"}
        await generalApi.patch(`/api/meetings/${meetingId}`,data)
   
       } catch(err){
           console.log(err.message)
       }

}


// Filters for profiles:

const filterProByLocation = text => {
    dispatch({type: FILTER_PRO_LOC , payload: text })
}

const clearFilterPro = () => {
    dispatch({type: CLEAR_FILTER_PRO })
}


const getAllCities = async () => {
    try{

       const res = await generalApi.get(`/api/cities`)
       dispatch({
           type: PERSIST_CITIES,
           payload: res.data
       })
   
       } catch(err){
           console.log(err.message)
       }
}

// Rate somebody on meeting

    const postRating = async data => {
        try{
            setAuthToken(localStorage.token)
            await generalApi.post(`/api/ratings`,data)
        
            } catch(err){
                console.log(err.message)
            }   
    }

   return (
       <AppContext.Provider 
       value={{
        communityProfiles: state.communityProfiles,
        filteredCommunityProfiles: state.filteredCommunityProfiles,
        chosenProfile: state.chosenProfile,
        chosenProfileRatings: state.chosenProfileRatings,
        recommandations: state.recommandations,
        filteredRecommandations: state.filteredRecommandations,
        questions: state.questions,
        filteredQuestions: state.filteredQuestions,
        userMeetings: state.userMeetings,
        cities: state.cities,
        getProfiles,
        getChosenProfile,
        updateProfile,
        addPhotoToPortfolio,
        editProfilePhoto,
        getAllRecommandations,
        addRecommandation,
        commentRecommandation,
        filterRecByTheme,
        filterRecByLocation,
        filterRecByAll,
        clearFilterRec,
        getAllQuestions,
        addQuestion,
        commentQuestion,
        filterQueByLocation,
        filterQueByTheme,
        filterQueByAll,
        clearFilterQue,
        getUserMeetings,
        requestMeeting,
        acceptMeeting,
        finishMeeting,
        filterProByLocation,
        clearFilterPro,
        getAllCities,
        postRating,
        getChosenProfileRatings
       }}>

           {props.children}
       </AppContext.Provider>
   )

}
export default AppState