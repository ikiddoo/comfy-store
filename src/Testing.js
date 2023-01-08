import React from 'react'
import styled from 'styled-components'

const Testing = () => {
    return (
        // wrap Testing component with styled component
        <Wrapper>
            <h3>hello world</h3>
            <p>hello world</p>
            {/* example of nesting styles */}
            <div className='article'>
                <p>this is article</p>
            </div>
            <button>click me</button>
        </Wrapper>
    )
}

// create styled component
const Wrapper = styled.section`
    h3 {
        color: red;
    }
    /* nesting style */
    .article {
        p {
            color: green;
        }
    }
`
export default Testing