import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import fakeData from './FakeData';

const _format = (data) => {
	return data.map(item => {
		return ([
			{text: item.name},
			{text: item.username},
			{text: item.email},
			{text: item.phone},
			{text: item.website},
		]);
	});
}

export default (rows) => {
	const {vfs} = vfsFonts.pdfMake;
	pdfMake.vfs = vfs;
	pdfMake.fonts = {
	    微软雅黑: {
	        normal: '微软雅黑.ttf',
	        bold: '微软雅黑.ttf',
	        italics: '微软雅黑.ttf',
	        bolditalics: '微软雅黑.ttf',
		}
	}
	const data = fakeData(rows);
	const formattedData = _format(data);

  const documentDefinition = {
		pageSize: 'A4',
		pageOrientation: 'landscape',
		content: [
			{text: 'React + pdfmake example'},
			'\n',
			{
				table: {
					headerRows: 1,
					dontBreakRows: true,
					body: [
						[{text: '姓名', style: 'tableHeader'}, {text: '用户名', style: 'tableHeader'}, {text: '邮箱', style: 'tableHeader'}, {text: '手机', style: 'tableHeader'}, {text: '网站', style: 'tableHeader'}],
						...formattedData,
					]
				}
			}
		],
		defaultStyle: {
			font: '微软雅黑',
		},
  };

	pdfMake.createPdf(documentDefinition).open();
}
