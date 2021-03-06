/* Copyright (c) 2015 - 2017, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Use in source and binary forms, redistribution in binary form only, with
 * or without modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions in binary form, except as embedded into a Nordic
 *    Semiconductor ASA integrated circuit in a product or a software update for
 *    such product, must reproduce the above copyright notice, this list of
 *    conditions and the following disclaimer in the documentation and/or other
 *    materials provided with the distribution.
 *
 * 2. Neither the name of Nordic Semiconductor ASA nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * 3. This software, with or without modification, must only be used with a Nordic
 *    Semiconductor ASA integrated circuit.
 *
 * 4. Any software provided in binary form under this license must not be reverse
 *    engineered, decompiled, modified and/or disassembled.
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* eslint react/forbid-prop-types: off */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { getUuidName } from '../utils/uuid_definitions';

function formatUuid(value) {
    if (!value) { return value; }

    if (value.length > 8) {
        return `${value.slice(0, 8)}...`;
    }

    return value;
}

class UuidLookup extends React.PureComponent {
    shouldComponentUpdate(nextProps) {
        return !(JSON.stringify(this.props.uuidDefs) === JSON.stringify(nextProps.uuidDefs));
    }

    render() {
        const {
            title,
            onSelect,
            uuidDefs,
            pullRight,
        } = this.props;

        const sorted = Object.keys(uuidDefs).sort((a, b) => parseInt(a, 16) - parseInt(b, 16));

        return (
            <div className="uuid-lookup">
                <Dropdown
                    className="uuid-dropdown"
                    id="dropdown-uuid-lookup"
                    title={title}
                    onSelect={(eventKey, event) => onSelect(event, eventKey)}
                    pullRight={pullRight}
                >
                    <Dropdown.Toggle noCaret>
                        <span className="icon-search" aria-hidden="true" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="scroll-menu">
                        <MenuItem header key="header0">{title}</MenuItem>
                        {
                            sorted.map(uuid => (
                                <MenuItem
                                    key={uuid}
                                    title={`${uuid}: ${getUuidName(uuid)}`}
                                    eventKey={uuid}
                                >
                                    {`${formatUuid(uuid)}: ${getUuidName(uuid)}`}
                                </MenuItem>
                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}

UuidLookup.propTypes = {
    title: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    uuidDefs: PropTypes.object.isRequired,
    pullRight: PropTypes.bool,
};

UuidLookup.defaultProps = {
    title: 'Predefined UUIDs',
    pullRight: false,
};

export default UuidLookup;
