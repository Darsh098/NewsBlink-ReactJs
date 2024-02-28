import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 9
    }

    static PropTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            loading: false
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=8261cbfa5baf424b9c15ab5b99958959&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    handleNextBtn = async () => {
        if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=8261cbfa5baf424b9c15ab5b99958959&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                loading: false,
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }
    handlePrevBtn = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=8261cbfa5baf424b9c15ab5b99958959&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            loading: false,
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }

    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center">NewsBlink - Top Headlines</h2>
                {this.state.loading && < Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""}
                                description={element.description ? element.description.length >= 60 ? element.description.slice(0, 60) + "..." : element.description : ""}
                                imageUrl={element.urlToImage ? element.urlToImage : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=740"} newsUrl={element.url} />
                        </div>
                    })}

                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1}
                        className="btn btn-dark" onClick={this.handlePrevBtn}>{"< Previous"}</button>

                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
                        className="btn btn-dark" onClick={this.handleNextBtn}>{"Next >"}</button>
                </div>
            </div >
        )
    }
}

export default News