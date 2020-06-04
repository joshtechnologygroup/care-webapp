import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toast from './toast';
import './toaster.scss';

const Toaster = (props) => {
  const { toastList, position, autoDelete, dismissTime } = props;
  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, dismissTime);

    return () => {
      clearInterval(interval);
    }
  }, [toastList, autoDelete, dismissTime, list]);

  const deleteToast = id => {
    const listItemIndex = list.findIndex(e => e.id === id);
    const toastListItem = toastList.findIndex(e => e.id === id);
    list.splice(listItemIndex, 1);
    toastList.splice(toastListItem, 1);
    setList([...list]);
  }

  return (
    <>
      <div className={`toaster toaster--${position}`}>{toastList.length}
        {
          toastList.map((toast, i) =>
            <Toast deteleCallback={deleteToast} key={i} toast={toast} />
          )
        }
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  toastList: state.toasts,
});

Toaster.propTypes = {
  toastList: PropTypes.array.isRequired,
  position: PropTypes.string,
  autoDelete: PropTypes.bool,
  dismissTime: PropTypes.number
}

Toaster.defaultProps = {
  toastList: [],
  position: 'bottom-right',
  autoDelete: true,
  dismissTime: 5000
}

export default connect(mapStateToProps)(Toaster);
