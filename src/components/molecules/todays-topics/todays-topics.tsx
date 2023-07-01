import { ListItem } from "@/components/atoms/list-item/list-item"
import { List } from "@/components/atoms/list/list"
import { Topic } from "@/core/Models/topic"
import { api } from "@/core/api"
import { useQuery } from "react-query"

import "./todays-topics.css"
import { getToday, isSameDate } from "@/core/utils/date"

interface TopicResponse {
    topics: Topic[]
}

export function TodaysTopics() {
    const today = getToday();
    const { isLoading, error, data, refetch } = useQuery('topicsData', () =>
        api.get<TopicResponse>('/topic/todays').then(r => r.data.topics)
    )

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)

        return date.toLocaleDateString('pt-BR')
    }

    const getStudyType = (topic: Topic) => {
        const createdAt = new Date(topic.created_at)
        const firstRevision = new Date(topic.firstRevision)
        const secondRevision = new Date(topic.lastRevision)

        if(isSameDate(createdAt, today)) {
            return <h4>Estudar hoje</h4>
        } else if(isSameDate(firstRevision, today)) {
            return <h4 className="revision">Primeira revisão</h4>
        } else if(isSameDate(secondRevision, today)) {
            return <h4 className="revision">Segunda revisão</h4>
        }

        return null
    }

    if(isLoading) return <p>Loading...</p>
    if(error) return <p>error on load todays topics</p>

    return (
        <section className="todays-topics">
            <header>
                <h2>Tópicos do dia</h2>
                <button onClick={() => refetch()}>&#8635;</button>
            </header>
            <List style={{padding: '0 1rem'}}>
                {data?.map(topic => (
                    <ListItem key={topic.id}>
                        <h3>{topic.name}</h3>
                        <div className="revisoes">
                            {getStudyType(topic)}
                            <p>
                                <strong>primeira revisão:</strong>
                                {formatDate(topic.firstRevision)}
                            </p>
                            <p>
                                <strong>segunda revisão:</strong>
                                {formatDate(topic.lastRevision)}
                            </p>
                        </div>
                    </ListItem>
                ))}
            </List>
        </section>
    )
}