import XLSX, { WorkSheet } from 'xlsx'

export function onExportExcel(outData) {
  let workSheet: WorkSheet = XLSX.utils.aoa_to_sheet(outData)
  let workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, workSheet, '第一页')
  XLSX.writeFile(workbook, '监测数据.xlsx')
}