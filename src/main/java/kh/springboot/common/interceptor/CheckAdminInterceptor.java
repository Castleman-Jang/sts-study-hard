package kh.springboot.common.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kh.springboot.member.model.vo.Member;

public class CheckAdminInterceptor implements HandlerInterceptor{
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		Member loginUser = (Member)request.getSession().getAttribute("loginUser");
		if(loginUser == null || loginUser.getIsAdmin().equals("N")) {
			System.out.println(request.getHeader("fetch")); // 저~기 리액트 App.jsx에서 보낸거 확인해보는거임
			if("true".equals(request.getHeader("fetch"))) {
				response.setContentType("application/json; charset=UTF-8");
				response.setStatus(HttpServletResponse.SC_FORBIDDEN); // 403코드라는데 뭔지 모르겠음 검색ㄱㄱ
			}else {
				response.setContentType("text/html; charset=UTF-8");
				response.getWriter().write("<script>alert('접근권한이 없습니다.'); location.href='/home/';</script>");
			}
				return false;
		}
		return HandlerInterceptor.super.preHandle(request, response, handler);
	}

}
