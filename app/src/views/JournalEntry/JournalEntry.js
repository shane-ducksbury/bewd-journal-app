import React, { useState, useEffect } from 'react'
import { Route, Link, useParams, useHistory, useRouteMatch } from 'react-router-dom'
import Axios from 'axios';
import { toast } from 'react-toastify'
import parse from 'html-react-parser'
import EditJournalEntry from '../EditJournalEntry/EditJournalEntry'

export const JournalEntry = ({ currentJournalId, handleForceRefresh, token }) => {
    const [journalEntry, setJournalEntry] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)

    const history = useHistory()
    const { journalEntryId } = useParams()
    const { url, path } = useRouteMatch()
    const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/entries/`
    
    const deleteJournalEntry = async () => {
        const response = window.confirm('Are you sure you want to delete?')
        if (response){
            try {
                await Axios.delete(`${API_ENDPOINT}${journalEntryId}`, {
                    headers: {
                      'Authorization': `Bearer ${token.accessToken}`
                    }
                  })
                history.push(`/journals/${currentJournalId}`)
                handleForceRefresh(false)
                toast.success('Journal Entry Deleted')
            } catch (e) {
                toast.error(`Couldn't reach the server. Try again later.`, { autoClose:false })
            }
        }
    }
    
    // Realistically I don't need to go out to the API to get this
    // as I get it in the main journal entries call. Anyway, here it is.
    useEffect(() => {
        async function getData() {
            try {
                const response = await Axios.get(`${API_ENDPOINT}${journalEntryId}`, {
                    headers: {
                      'Authorization': `Bearer ${token.accessToken}`
                    }
                  })
                setJournalEntry(response.data)
                setDataLoaded(true)
            } catch (e) {
                toast.error(`Couldn't reach the server. Try again later.`, { autoClose:false })
            }
        }
        if ( !dataLoaded || journalEntryId !== journalEntry.journal_entry_id){ getData() } 
        // eslint-disable-next-line
    }, [dataLoaded, journalEntryId])
    
    if (dataLoaded) {
        return(
            <>
                <Route path={`${path}/edit`}>
                    <EditJournalEntry journalEntry={journalEntry[0]} handleForceRefresh={handleForceRefresh} token={token}/>
                </Route>
                <Route exact path={`${path}`}>
                    <div className="card journal-entry">
                        <header className="card-header">
                            <h1 className="card-header-title">{journalEntry[0].title}</h1>
                        </header>
                        <div className="card-content">
                            {parse(journalEntry[0].content.htmlEntryText)}
                        </div>
                        <Link to={`${url}/edit`}><button className="button is-link">Edit</button></Link>
                        <button className="button is-danger" onClick={deleteJournalEntry}>Delete</button>
                    </div>
                </Route>
                </>
        )
    } else {
        return <p>Data is still loading.</p>
    }
}

export default JournalEntry