import React from 'react';
import { CSVLink } from 'react-csv';

const ExportButtonGuidesBeetrackNoMatch = ({ data }) => {
  const headers = [
    { label: 'id', key: 'id' },
    { label: 'Guia', key: 'guide' },
    { label: 'Usuario', key: 'usuario' },
    { label: 'Fecha Scaneo', key: 'date' },
  ];

  return (
    <CSVLink
      data={data}
      headers={headers}
      className="btn btn-primary"
      separator={';'}
      filename={`guides_report_${new Date().toLocaleDateString()}.csv`}>
      <i className="fa fa-file-download" />
      <span> Exportar</span>
    </CSVLink>
  );
};

export default ExportButtonGuidesBeetrackNoMatch;
