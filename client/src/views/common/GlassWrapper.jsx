
import PropTypes from 'prop-types'
import '../../styles/common/GlassWrapper.css'

export default function GlassWrapper({ children, pdx, pdy }) {
    const customStyles = {
        padding: `${pdy}px ${pdx}px`
    }

    return (
        <div className="main-container">
            <div
                className="glass-container"
                style={customStyles}
            >
                {children}
            </div>
        </div>
    )
}

GlassWrapper.propTypes = {
    children: PropTypes.any,
    pdx: PropTypes.number,
    pdy: PropTypes.number,
}