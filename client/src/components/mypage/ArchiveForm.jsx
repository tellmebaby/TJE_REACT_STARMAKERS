import React from 'react';
import styles from '../../components/mypage/css/ArchiveForm.module.css';
import DangsmCard from '../../components/main/starcard/DangsmCard';
import Menu from './Menu';

const ArchiveForm = ({ data }) => {
  return (
    <div className="container">
      <div className="row">
        <Menu styles={styles} />
        <div className="col-md-9">
          <div className={styles.list}>
            {data.map((item, index) => (
              <DangsmCard key={index} card={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveForm;
