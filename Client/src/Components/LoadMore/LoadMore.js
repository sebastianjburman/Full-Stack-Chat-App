import "./LoadMore.css"
function LoadMore(props) {
    return (
        <button className="loadMoreBtn" onClick={()=>props.roomSearchLoadMore(props.searchInput)}>
            Load More
        </button>);
}

export default LoadMore;