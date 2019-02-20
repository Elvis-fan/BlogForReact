import * as React from 'react'
import { connect } from 'react-redux'
import { stores } from 'src/common/stores'
interface HomeProps {
    test: any
}
class Home extends React.Component<HomeProps, any> {

    public render() {
        const { test } = this.props

        // test()

        return <div>
            12
            {/* <img src='public/img/temp/tem-about.jpg' /> */}
        </div>
    }
}
const mapStateToProps = (state: any) => {
    return state
}

const mapDispatchToProps = (dispatch: any) => ({
    // test: () => test()(stores.dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)
