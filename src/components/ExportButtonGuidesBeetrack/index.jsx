import React from 'react';
import { CSVLink } from 'react-csv';

const ExportButtonGuidesBeetrack = ({ data }) => {
  const headers = [
    { label: 'id', key: 'id' },
    { label: 'Clave Unica', key: 'claveUnica' },
    { label: 'Nombre Cliente', key: 'nombreCliente' },
    { label: 'Rut Cliente', key: 'rutCliente' },
    { label: 'Direccion', key: 'direccion' },
    { label: 'Producto', key: 'producto' },
    { label: 'Proveedor', key: 'proveedor' },
    { label: 'Comuna', key: 'comuna' },
    { label: 'Guia', key: 'guia' },
    { label: 'fechaSubida', key: 'fechaSubida' },
    { label: 'Devolucion', key: 'devolucion' },
    { label: 'Patente', key: 'patente' },
    { label: 'Fono', key: 'fono' },
    { label: 'Sensible', key: 'sensible' },
    { label: 'Fecha Entrega', key: 'fechaEntrega' },
    { label: 'Patente Real', key: 'patenteReal' },
    { label: 'Encargado Preparacion', key: 'encargadoPreparacion' },
    { label: 'Fecha Preparacion', key: 'fechaPreparacion' },
    { label: 'Encargado Distribucion', key: 'encargadoDistribucion' },
    { label: 'Fecha Entrada', key: 'fechaEntrada' },
    { label: 'Encargado Despacho', key: 'encargadoDespacho' },
    { label: 'Fecha Despacho', key: 'fechaDespacho' },
    { label: 'Encargado Entraga', key: 'encargadoEntrega' },
    { label: 'Estado Entrega', key: 'estadoEntrega' },
    { label: 'Estado', key: 'estado' },
    { label: 'pgi', key: 'pgi' },
    { label: 'Clientes', key: 'tagClientes' },
    { label: 'Direccion', key: 'tagDireccion' },
    { label: 'Faena', key: 'tagFaena' },
    { label: 'ObservacionCliente', key: 'tagObservacionCliente' },
    { label: 'Estado', key: 'tagPatente' },
    { label: 'Patente', key: 'tagPgi' },
    { label: 'Tipo', key: 'tagTipo' },
    { label: 'TipoServicio', key: 'tagTipoServicio' },
    { label: 'TotalDo', key: 'tagTotalDo' },
    { label: 'TotalDoPeso', key: 'tagTotalDoPeso' },
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

export default ExportButtonGuidesBeetrack;
