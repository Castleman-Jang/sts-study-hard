package kh.springboot.ajax.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletResponse;
import kh.springboot.board.model.service.BoardService;
import kh.springboot.board.model.vo.Board;
import kh.springboot.board.model.vo.Reply;
import kh.springboot.member.model.service.MemberService;
import kh.springboot.member.model.vo.Member;
import kh.springboot.member.model.vo.TodoList;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping({"/member", "/board"})
@SessionAttributes("loginUser")
public class AjaxController {
	/*
		비동기 통신 ajax

		 	Controller -> view 데이터를 보내는 방법 2가지
		 	1. @ResponseBody : return값 존재 / 2. PrintWriter
	 	
	 	RestController : @Controller + @ResponseBody
	 										주 반환 형태 JSON형태{}
	 										
		-> REST API 개발에 쓰임
		(이거 중요한가봄)
		REST API (Representational State Transfer API)
		: 자원을 이름으로 구분하며 해당 자원이 상태를 주고 받는 모든 것
	  		1. HTTP URI를 통해 자원 명시
	  		2. HTTP Method(GET, POST, PUT, DELETE, PATCH 등등)를 통해
	  		3. 해당 자원(URI)에 대한 CRUD 적용
	  			Create	:데이터 생성 (POST)
	  			Read	:데이터 조회 (GET)
	  			Update	:데이터 수정 (PUT, PATCH)
	  			Delete	:데이터 삭제 (DELETE)
	 */
	private final MemberService mService;
	private final BoardService bService;
	private final JavaMailSender mailSender;

	
	//아이디 중복확인
	@GetMapping("checkValue")
	public int checkValue(@RequestParam("value") String value, @RequestParam("column") String column) {
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("col", column);
		map.put("val", value);
		int result = mService.checkValue(map);
		return result;
	}
	
	@GetMapping("echeck")
	public String checkEmail(@RequestParam("email") String email) {
		// MimeMessage = html형식도 메일로 보낼 수 있음
		// SimpleMessage = Text형식만 메일로 보낼 수 있음
		MimeMessage mimeMessage = mailSender.createMimeMessage();
		
		// 수신자, 제목, 본문 설정
		String subject = "[SpringBoot] 이메일 확인";
		String body = "<h1 align='center'>SpringBoot 이메일 확인</h1><br>";
		body += "<div style='border: 5px solid yellowgreen; text-align: center; font-size: 15px;'>";
		body += "본 메일은 이메일을 확인하기 위해 발송되었습니다.<br>";
		body += "아래 숫자를 인증번호 확인란에 작셩하여 확인해주시기 바랍니다.<br><br>";
		
		// 인증번호 숫자 5개
		String random = "";
		for(int i = 0; i < 5; i++) {
			random += (int)(Math.random() * 10); 
		}
		System.out.println(random);
		
		body += "<span style='font-size: 30px; text-decoration: underline;'><b>" + random + "</b></span><br></div>";
		
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
		try {
			mimeMessageHelper.setTo(email);
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setText(body, true);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		
		mailSender.send(mimeMessage); // Email 전송
		
		return random;
	}
	
	@PostMapping("list")
	public int insertTodoList(@ModelAttribute TodoList todo) {
		int result = mService.insertTodo(todo);
		return result > 0 ? todo.getTodoNum() : result ;
	}
	
	@PutMapping("list")
	public int updateTodo(@ModelAttribute TodoList todo) {
		return mService.updateTodo(todo);
	}
	
	@DeleteMapping("list")
	public int deleteTodo(@RequestParam("num") int todoNum) {
		return mService.deleteTodo(todoNum);
	}
	
	@GetMapping(value="top", produces="application/json; charset=UTF-8") // produces = response의 contentType 제어 => json만 가능, gson은 불가능
	public String selectTop(HttpServletResponse response) {
		ArrayList<Board> list = bService.selectTop();
		
		// json버전
		// Board => JSONObject / ArrayList => JSONArray
		JSONArray array = new JSONArray();
		for(Board b : list) {
			JSONObject json = new JSONObject();
			json.put("boardId", b.getBoardId());
			json.put("boardTitle", b.getBoardTitle());
			json.put("nickName", b.getBoardWriter());
			json.put("boardModifyDate", b.getBoardModifyDate()); // MyBatis때와는 다르게 json을 지원하는 라이브러리가 달라서 Date를 굳이 String으로 안 바꿔도 됨
			json.put("boardCount", b.getBoardCount());
			
			array.put(json); // 지원하는 라이브러리 형태에 따라 메소드도 달라짐 MyBatis 때는 array.add(); SpringBoot에서 사용하는 라이브러리는 array.put();
		}
//		response.setContentType("application/json; charset=UTF-8");
		return array.toString();
		
		// gson 버전
//		response.setContentType("application/json; charset=UTF-8");
//		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
//		return gson.toJson(list); // 프로젝트에는 이 버전으로 사용 예정
		
//		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
//		response.setContentType("application/json; charset=UTF-8");
//		try {
//			gson.toJson(list, response.getWriter());
//		} catch (JsonIOException | IOException e) {
//			e.printStackTrace();
//		}
	}
	
	@PostMapping(value="reply", produces="application/json; charset=UTF-8")
	public String insertReply(@ModelAttribute Reply r/*, HttpServletResponse response*/) {
		int result = bService.insertReply(r);
		ArrayList<Reply> list = bService.selectReplyList(r.getRefBoardId());
		
		ObjectMapper om = new ObjectMapper();
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		om.setDateFormat(sdf);
		String str = null;
		try {
			str = om.writeValueAsString(list);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		//response.setContentType("application/json; charset=UTF-8");
		return str;
	}
	
	@DeleteMapping("reply")
	public int deleteReply(@RequestParam("rId") int rId) {
		return bService.deleteReply(rId);
	}
	
	@PutMapping("reply")
	public int updateReply(@ModelAttribute Reply r) {
		// Reply r = new Reply();
		// r.setReplyId(replyId);
		// r.setReplyContent(replyContent);
		return bService.updateReply(r); 
	}
	
	@PutMapping("profile")
	public int updateProfile(@RequestParam(value="profile", required=false) MultipartFile profile, Model model) {
//		System.out.println(profile);
		Member m = (Member)model.getAttribute("loginUser");
		
		String savePath = "C:\\profiles";
		File folder = new File(savePath);
		if(!folder.exists()) {
			folder.mkdirs();
		}
		
		if(m.getProfile() != null) {
			File f = new File(savePath + "\\" + m.getProfile());
			f.delete();
		}
		String renameFileName = null;
		if(profile != null) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyMMddHHmmssSSS");
			int ranNum = (int)(Math.random()*100000);
			String originFileName = profile.getOriginalFilename();
			renameFileName = sdf.format(new Date())+ ranNum + originFileName.substring(originFileName.lastIndexOf("."));
			
			try {
				profile.transferTo(new File(folder + "\\" + renameFileName));
			}catch(IllegalStateException | IOException e) {
				e.printStackTrace();
			}
			
		}
		m.setProfile(renameFileName);
		int result = mService.updateProfile(m);
		if(result > 0) {
			model.addAttribute("loginUser", m);
		}
		return result;
	}
	/*
	@GetMapping("weather")
	public String getWeather() {
		StringBuilder sb = new StringBuilder();
		try {
			StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"); 
	        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=73a2ba0f91e7b3fddee22c34758b6dbde03fb7e0cce96e56523df148de5fe757"); 
	        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"));
	        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("1000", "UTF-8")); 
	        urlBuilder.append("&" + URLEncoder.encode("dataType","UTF-8") + "=" + URLEncoder.encode("JSON", "UTF-8")); 
	        
	        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd HHmm");
	        String now = sdf.format(new Date());
	        String[] dayTime = now.split(" ");
	        urlBuilder.append("&" + URLEncoder.encode("base_date","UTF-8") + "=" + URLEncoder.encode(dayTime[0], "UTF-8")); 
	        
	        int[] baseTime = {200, 500, 800, 1100, 1400, 1700, 2000, 2300};
	        int index = -1;
	        for(int i = 0; i< baseTime.length; i++) {
	        	if(Integer.parseInt(dayTime[1]) <= baseTime[i]) {
	        		index = i - 1;
	        		
	        		if(i == 0) {
	        			index = i;
	        		}
	        		
	        		dayTime[1] = ("0" + baseTime[index]).substring(("0" + baseTime[index]).length()-4);
	        		break;
	        	}
	        }
	        if(index == -1) {
	        	dayTime[1] = "2300";
	        }
	        
	        urlBuilder.append("&" + URLEncoder.encode("base_time","UTF-8") + "=" + URLEncoder.encode(dayTime[1], "UTF-8")); 
	        urlBuilder.append("&" + URLEncoder.encode("nx","UTF-8") + "=" + URLEncoder.encode("55", "UTF-8")); 
	        urlBuilder.append("&" + URLEncoder.encode("ny","UTF-8") + "=" + URLEncoder.encode("127", "UTF-8")); 
	        
//	        URL url = new URL(urlBuilder.toString());
	        URL url = (new URI(urlBuilder.toString())).toURL();
	        
	        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	        conn.setRequestMethod("GET");
	        conn.setRequestProperty("Content-type", "application/json");
	        BufferedReader rd;
	        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
	            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	        } else {
	            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
	        }
//	        StringBuilder sb = new StringBuilder();
	        String line;
	        while ((line = rd.readLine()) != null) {
	            sb.append(line);
	        }
	        rd.close();
	        conn.disconnect();
	        //System.out.println(sb.toString());
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return sb.toString();
	}
	*/
}
