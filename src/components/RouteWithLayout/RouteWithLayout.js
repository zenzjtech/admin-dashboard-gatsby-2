import React from 'react';
import PropTypes from 'prop-types';

const RouteWithLayout = props => {
    const { layout: Layout, component: Component, ...rest } = props;

    return (
        <Layout>
            <Component {...rest} />
        </Layout>
    );
};

RouteWithLayout.propTypes = {
    component: PropTypes.any.isRequired,
    layout: PropTypes.any.isRequired,
    path: PropTypes.string
};

export default RouteWithLayout;
