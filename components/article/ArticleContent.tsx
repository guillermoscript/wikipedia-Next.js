
// "use client";
// import DOMPurify from 'dompurify';

// const sanitizeHTML = (content: string) => ({
//     __html: DOMPurify.sanitize(content)
// });

export default function ArticleContent({ article}: { article: any }) {
    return (
        // <div className="article-content" dangerouslySetInnerHTML={sanitizeHTML(article)} />
        <div className="article-content" dangerouslySetInnerHTML={
            { __html: article }
        } />
    )
}