import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
    render() {
        return (
            <div>
                This Is A News Component
                <NewsItem />
                <NewsItem />
                <NewsItem />
                <NewsItem />
                <NewsItem />
            </div>
        )
    }
}

export default News