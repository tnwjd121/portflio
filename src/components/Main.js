import React, { useEffect, useState } from 'react'
import '../css/main.css'
import axios from 'axios';

export default function Main() {
  const API_URL = "http://localhost:5000"

  const [certificationData, setCertificationData] = useState([]);

  useEffect(() => {
    certificationList()
  }, [])

  useEffect(() => {
  }, [certificationData]);



  const certificationList = async () => {
    try {
      const response = await axios.get(`${API_URL}/certifications`);
      const sortedData = response.data.sort((a, b) => new Date(b.dateOfIssue) - new Date(a.dateOfIssue));
      setCertificationData(sortedData);

    } catch (error) {
      console.error("에러 발생", error)
    }
  }

  const currentYear = new Date().getFullYear();
  const startYear = 2016;
  const yearsRange = Array.from({length: currentYear - startYear + 1}, (_,i) => startYear + i);

  const data = [
    {
      "category" : "경력",
      "label" : "더존비즈온",
      "detail" : "영업기획팀",
      "startDate" : "2018.11",
      "endDate" : "2023.08"
    },
    {
      "category" : "경력",
      "label" : "IBK저축은행",
      "detail" : "D-IT지원부",
      "startDate" : "2024.10",
      "endDate" : "2025.01"
    },
    {
      "category" : "학력",
      "label" : "경희사이버대학교",
      "detail" : "마케팅경영리더십학과, 컴퓨터정보통신학과",
      "startDate" : "2021.03",
      "endDate" : "2024.02"
    },
    {
      "category" : "학력",
      "label" : "부산세무고등학교",
      "detail" : "국제통상무역학과",
      "startDate" : "2016.03",
      "endDate" : "2019.02"
    },
    {
      "category" : "교육",
      "label" : "코리아IT아카데미",
      "detail" : "빅데이터 분석 및 웹 개발 등",
      "startDate" : "2023.07",
      "endDate" : "2024.07"
    },
  ];

  const categories = [...new Set(data.map(item => item.category))];

  const parseYear = (dateStr) => {
    const [year, month] = dateStr.split('.').map(Number);
    return year + (month ? (month - 1) / 12 : 0);
  };




  return (
    <div id='body'>
      <div id='introduce-body'>
        <div id='subtitle'>Introduce</div>
        <div id='introduce-container'>
          <div id='introduce-container-left'>
            <img src={require('../imgs/포트폴리오사진.jpg')}></img>
          </div>
          <div id='introduce-container-right'>
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>백수정</td>
                </tr>
                <tr>
                  <td>About me</td>
                  <td>IT기업에서 5년 동안 마케팅 및 영업지원 업무를 담당하다가  내부 실적관리 프로그램 기획자로 참여 후 백엔드 개발에 관심이 생겨 백엔드 개발자로 전향하게 되었습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id='certification-body'>
        <div>Certification</div>
        <table>
          <thead>
            <tr>
              <td>자격명</td>
              <td>발행기관</td>
              <td>자격증번호</td>
              <td>취득년월일</td>
            </tr>
          </thead>
          <tbody>
            {certificationData.map((cert, index) => (
              <tr key={index}>
                <td>{cert.certificationName}</td>
                <td>{cert.issuingOrganization}</td>
                <td>{cert.certificationNumber}</td>
                <td>{cert.dateOfIssue}</td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
      <div id="chart-body">
      <svg  id='chart-container'>
        {/* X축 (연도) */}
        {yearsRange.map((year, index) => (
          <text key={year} x={100 + index * 75} y="350" textAnchor="middle" fontSize="12">{year}</text>
        ))}

        {/* Y축 (카테고리) */}
        {categories.map((category, index) => (
          <text key={category} x="75" y={index * 80 + 100} textAnchor="end" fontSize="14">{category}</text>
        ))}

        {/* 막대 그래프 */}
        {data.map((item, index) => {
          const y = categories.indexOf(item.category) * 80 + 90;
          const xStart = 100 + (parseYear(item.startDate) - startYear) * 75;
          const xEnd = 100 + (parseYear(item.endDate) - startYear) * 75;
          const width = xEnd - xStart;

          return (
            <g key={index}>
              {/* 텍스트 정보 */}
              <text x={xStart + width / 2} y={y - 40} textAnchor="middle" fontSize="12" fontWeight="bold" fill="black">{item.label}</text>
              <text x={xStart + width / 2} y={y - 25} textAnchor="middle" fontSize="10" fill="black">{item.detail}</text>
              <text x={xStart + width / 2} y={y - 15} textAnchor="middle" fontSize="10">{item.startDate} ~ {item.endDate}</text>
              {/* 막대 */}
              <rect x={xStart} y={y} width={width} height="5" fill="steelblue" strokeWidth="1" />
            </g>
          );
        })}
      </svg>
      </div>
    </div>
  )
}
